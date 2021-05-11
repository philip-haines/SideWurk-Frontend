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
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
		<View style={styles.screen}>
			<View style={styles.homeContainer}>
				<View style={styles.homeRow}>
					<AntDesign name="star" size={24} color="black" />
					<Text style={styles.homeTileTitle}>Starred</Text>
				</View>
				<View style={styles.homeRow}>
					<MaterialIcons
						name="assignment-late"
						size={24}
						color="black"
					/>
					<Text style={styles.homeTileTitle}>Assigned</Text>
				</View>
				<View style={styles.homeRow}>
					<Entypo name="check" size={24} color="black" />
					<Text style={styles.homeTileTitle}>Recently Completed</Text>
				</View>
			</View>
			<View>
				<View style={styles.homeRow}>
					<MaterialCommunityIcons
						name="silverware-fork-knife"
						size={24}
						color="black"
					/>
					<Text style={styles.title}>Restaurants</Text>
				</View>
				<FlatList
					data={restaurants}
					renderItem={({ item }) => <Restaurant restaurant={item} />}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		padding: 16,
	},

	homeContainer: {
		width: "100%",
		marginBottom: 60,
		marginTop: 10,
	},

	homeRow: {
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		height: 40,
		width: "100%",
	},

	homeTileTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 10,
	},
});
