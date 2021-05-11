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
import { useRoute } from "@react-navigation/native";
import TaskList from "../components/TaskList/TaskList";
import { MY_TASK_LISTS_QUERY } from "../Apollo/Queries";
import { CREATE_TASK_LIST, UPDATE_TASK_LIST } from "../Apollo/mutations";

import { FontAwesome } from "@expo/vector-icons";

export default function TabTwoScreen() {
	const route = useRoute();
	const id: number = route.params.id;

	const [taskLists, setTaskLists] = useState([]);
	const [createTaskList] = useMutation(CREATE_TASK_LIST, {
		refetchQueries: [{ query: MY_TASK_LISTS_QUERY }],
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
		}
	}, [data]);

	if (loading) {
		return <ActivityIndicator />;
	}

	const handlePress = () => {
		createTaskList({
			variables: {
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
						<FontAwesome name="plus" size={24} color="white" />
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
		paddingBottom: 30,
		paddingRight: 10,
		height: "12%",
		alignItems: "flex-end",
		justifyContent: "center",
		alignSelf: "flex-end",
	},
	button: {
		height: 40,
		width: 40,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
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
