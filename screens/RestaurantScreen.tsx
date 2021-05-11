import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import Restaurant from "../components/restaurants/Restaurant";

const MY_RESTAURANTS = gql`
	query myRestaurants {
		myRestaurants {
			id
			title
			users {
				id
				name
				email
			}
			taskLists {
				id
				title
			}
		}
	}
`;

export default function RestaurantScreen() {
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
		}
		console.log(setRestaurants);
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
