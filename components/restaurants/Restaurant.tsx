import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_RESTAURANT } from "../../Apollo/mutations";
interface User {
	user: {
		id: number;
		name: string;
		email: string;
	};
}

interface TaskList {
	taskList: {
		id: number;
		title: string;
	};
}

interface RestaurantProps {
	restaurant: {
		id: number;
		title: string;
		users: [User];
		taskLists: [TaskList];
	};
}

export default function Restaurant({ restaurant }: RestaurantProps) {
	const [taskLists, setTasks] = useState([]);
	const [restaurantTitle, setRestaurantTitle] = useState("");
	const [updateRestaurantTitle] = useMutation(UPDATE_RESTAURANT);
	const navigation = useNavigation();
	const handlePress = () => {
		navigation.navigate("TaskListScreen", {
			id: restaurant.id,
			title: restaurant.title,
		});
	};

	useEffect(() => {
		setTasks(restaurant.taskLists);
		setRestaurantTitle(restaurant.title);
	}, []);

	const dispatchTaskLists = () => {
		if (!taskLists[0]) {
			return null;
		}

		if (taskLists[0] && !taskLists[1]) {
			<View style={styles.taskListPreview}>
				return{" "}
				<Text style={{ color: "#2E2D4D" }}>{taskLists[0].title}</Text>;
			</View>;
		} else {
			return (
				<View style={styles.taskListPreview}>
					<Text style={{ color: "#2E2D4D", fontWeight: "bold" }}>
						{taskLists[taskLists.length - 2].title}
					</Text>
					<Text style={{ color: "#2E2D4D", fontWeight: "bold" }}>
						{taskLists[taskLists.length - 1].title}
					</Text>
				</View>
			);
		}
	};

	const handleUpdate = () => {
		updateRestaurantTitle({
			variables: {
				id: restaurant.id,
				title: restaurantTitle,
			},
		});
	};

	return (
		<View>
			<Pressable onPress={handlePress} style={styles.restaurant}>
				<View>
					<TextInput
						style={styles.restaurantName}
						value={restaurantTitle}
						onChangeText={setRestaurantTitle}
						editable={true}
						onEndEditing={handleUpdate}
					/>
					{dispatchTaskLists()}
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	restaurant: {
		height: 80,
		width: "100%",
		justifyContent: "center",
		backgroundColor: "white",
	},

	restaurantName: {
		height: 20,
		fontSize: 18,
		marginLeft: 10,
		fontWeight: "bold",
		color: "#2E2D4D",
	},

	taskListPreview: {
		marginVertical: 5,
		marginLeft: 20,
	},
});
