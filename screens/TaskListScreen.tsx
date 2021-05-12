import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	FlatList,
	Alert,
	ActivityIndicator,
	KeyboardAvoidingView,
	Pressable,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRoute, useNavigation } from "@react-navigation/native";
import TaskList from "../components/TaskList/TaskList";
import { MY_TASK_LISTS_QUERY } from "../Apollo/Queries";
import { CREATE_TASK_LIST, UPDATE_TASK_LIST } from "../Apollo/mutations";

import { Entypo } from "@expo/vector-icons";

export default function TabTwoScreen() {
	const route = useRoute();
	const navigation = useNavigation();
	const id: number = route.params.id;

	const [taskLists, setTaskLists] = useState([]);
	const [createTaskList] = useMutation(CREATE_TASK_LIST, {
		refetchQueries: [
			{ query: MY_TASK_LISTS_QUERY, variables: { restaurantId: id } },
		],
	});

	const [updateTaskList] = useMutation(UPDATE_TASK_LIST);

	const { data, error, loading } = useQuery(MY_TASK_LISTS_QUERY, {
		variables: {
			restaurantId: id,
		},
	});
	useEffect(() => {
		if (error) {
			Alert.alert("Error fetching. Please try again.", error.message);
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			setTaskLists(data.myTaskLists);
			navigation.setOptions({
				title: data.myTaskLists.title,
			});
		}
	}, [data]);

	if (loading) {
		return <ActivityIndicator />;
	}

	const handlePress = () => {
		createTaskList({
			variables: {
				restaurantId: id,
				title: "",
			},
		});
	};

	const handleTitleUpdate = (taskList) => {
		updateTaskList({
			variables: {
				id: taskList.id,
				title: taskList.title,
			},
		});
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<FlatList
					data={taskLists}
					renderItem={({ item }) => (
						<TaskList
							taskList={item}
							handleTitleUpdate={handleTitleUpdate}
						/>
					)}
					style={{ width: "100%" }}
				/>
				<View style={styles.buttonRow}>
					<Pressable style={styles.button} onPress={handlePress}>
						<Entypo name="add-user" size={24} color="white" />
					</Pressable>
					<Pressable style={styles.button} onPress={handlePress}>
						<Entypo name="add-to-list" size={24} color="white" />
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},

	buttonRow: {
		paddingBottom: 40,
		paddingRight: 10,
		height: "12%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		alignSelf: "flex-end",
	},
	button: {
		height: 50,
		width: 50,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
		marginHorizontal: 8,
	},

	// bottomRow: {
	// 	flexDirection: "row",
	// 	width: "100%",
	// 	justifyContent: "space-between",
	// 	alignItems: "center",
	// 	height: 85,
	// 	paddingBottom: 93,
	// },

	// addTaskListButton: {
	// 	height: 70,
	// 	width: 70,
	// 	backgroundColor: "#77df79",
	// 	alignSelf: "flex-end",
	// 	position: "absolute",
	// 	bottom: 60,
	// 	right: 30,
	// 	borderRadius: 50,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
});
