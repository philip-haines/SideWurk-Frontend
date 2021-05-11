import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import Restaurant from "../components/restaurants/Restaurant";
import { MY_RESTAURANTS } from "../Apollo/Queries";

export default function RestaurantScreen() {
	const navigation = useNavigation();
	const { data, error, loading } = useQuery(MY_RESTAURANTS);
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		if (error) {
			Alert.alert("Error fetching. Please try again.", error.message);
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			setRestaurants(data.myRestaurants);
			navigation.setOptions({
				title: data.myRestaurants.title,
			});
		}
	}, [data]);

	if (loading) {
		return <ActivityIndicator />;
	}

	return (
		<View>
			<FlatList
				data={restaurants}
				renderItem={({ item }) => <Restaurant restaurant={item} />}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({});
