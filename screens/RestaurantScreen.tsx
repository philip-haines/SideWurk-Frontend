import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Alert,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
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
	const [listData, setListData] = useState(
		restaurants.map((restaurant) => {
			key: restaurant.id;
			title: restaurant.title;
			tasks: restaurant.tasks;
			users: restaurant.users;
		})
	);
	const handleNavigation = (data) => {
		navigation.navigate("AddUsersScreen", {
			id: data.item.id,
			users: data.item.users,
		});
	};

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
			console.log(data.myRestaurants.title);
		}
	}, [data]);

	if (loading) {
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.screen}>
			<View style={styles.homeContainer}>
				<View style={styles.homeRow}>
					<AntDesign name="star" size={24} color="#2E2D4D" />
					<Text style={styles.homeTileTitle}>Starred</Text>
				</View>
				<View style={styles.homeRow}>
					<MaterialIcons
						name="assignment-late"
						size={24}
						color="#2E2D4D"
					/>
					<Text style={styles.homeTileTitle}>Assigned</Text>
				</View>
				<View style={styles.homeRow}>
					<Entypo name="list" size={24} color="#2E2D4D" />
					<Text style={styles.homeTileTitle}>Lists</Text>
				</View>
				<View style={styles.homeRow}>
					<Entypo name="check" size={24} color="#2E2D4D" />
					<Text style={styles.homeTileTitle}>Recently Completed</Text>
				</View>
			</View>
			<View>
				<View style={styles.homeRow}>
					<MaterialCommunityIcons
						name="silverware-fork-knife"
						size={30}
						color="#2E2D4D"
					/>
					<Text style={styles.title}>Restaurants</Text>
				</View>
				<SwipeListView
					data={restaurants}
					renderItem={(data, rowMap) => {
						return <Restaurant restaurant={data.item} />;
					}}
					renderHiddenItem={(data, rowMap) => {
						return (
							<Pressable
								style={styles.addUserButton}
								onPress={() => {
									handleNavigation(data);
									rowMap[data.item.key].closeRow();
								}}
							>
								<Entypo
									name="add-user"
									size={24}
									color="white"
								/>
							</Pressable>
						);
					}}
					leftOpenValue={75}
					closeOnRowPress={true}
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
		borderRightColor: "#715AFF",
	},

	homeTileTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 15,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginLeft: 10,
	},

	addUserButton: {
		height: "80%",
		width: 75,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#715AFF",
	},
});
