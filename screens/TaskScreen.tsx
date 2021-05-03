import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import TaskListItem from "../components/TaskList/TaskListItem";
import { GET_TASK_LIST } from "../Apollo/Queries";

const CREATE_TASK = gql`
	mutation createTask($content: String!, $taskListId: ID!) {
		createTask(content: $content, taskListId: $taskListId) {
			id
			content
			isComplete
			taskList {
				id
				progress
				tasks {
					id
					content
					isComplete
				}
			}
		}
	}
`;

export default function TabOneScreen() {
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState([]);

	const route = useRoute();

	const id = route.params.id;

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});

	useEffect(() => {
		if (error) {
			Alert.alert("Error fetching. Please try again.", error.message);
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			setTitle(data.getTaskList.title);
			setTasks(data.getTaskList.tasks);
		}
	}, [data]);

	const [
		createTask,
		{ data: createTaskData, error: createTaskError },
	] = useMutation(CREATE_TASK);

	const newTaskOnSubmit = (atIndex: number) => {
		createTask({
			variables: {
				content: "",
				taskListId: id,
			},
		});
	};

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!tasks) {
		return null;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<TextInput
					style={styles.title}
					onChangeText={setTitle}
					placeholder={"Title"}
					value={title}
				/>
				<FlatList
					data={tasks}
					renderItem={({ item, index }) => (
						<TaskListItem
							task={item}
							newTaskOnSubmit={() => newTaskOnSubmit(index + 1)}
						/>
					)}
					style={{ width: "100%" }}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
		justifyContent: "space-around",
	},
	title: {
		width: "100%",
		fontSize: 20,
		fontWeight: "bold",
	},
});
