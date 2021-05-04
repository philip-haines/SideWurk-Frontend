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
import { CREATE_TASK } from "../Apollo/mutations";

const DELETE_TASK = gql`
	mutation deleteTask($id: ID!) {
		deleteTask(id: $id)
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
	const [deleteTask] = useMutation(DELETE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
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

	const newTaskOnSubmit = () => {
		createTask({
			variables: {
				content: "",
				taskListId: id,
			},
		});
	};

	const deleteTaskOnBackspace = (passedTask) => {
		// const tasks = [...tasks];
		// const foundTask = tasks.filter((task) => passedTask.id === task);
		// const newTasks = tasks.pop(foundTask);
		// setTasks(newTasks);
		deleteTask({
			variables: {
				id: passedTask.id,
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
							newTaskOnSubmit={() => newTaskOnSubmit()}
							deleteTaskOnBackspace={deleteTaskOnBackspace}
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
