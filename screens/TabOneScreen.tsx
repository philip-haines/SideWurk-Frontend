import React, { useState } from "react";
import {
	StyleSheet,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import TaskListItem from "../components/TaskList/TaskListItem";

let id = 5;

export default function TabOneScreen() {
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState([
		{
			id: 1,
			content: "Buy Milk",
			isComplete: true,
		},
		{
			id: 2,
			content: "Buy Bread",
			isComplete: false,
		},
		{
			id: 3,
			content: "Buy Eggs",
			isComplete: false,
		},
		{
			id: 4,
			content: "Buy Cheese",
			isComplete: false,
		},
	]);

	const newTaskOnSubmit = (atIndex: number) => {
		const newTasks = [...tasks];
		newTasks.splice(atIndex, 0, {
			id: id,
			content: "",
			isComplete: false,
		});
		setTasks(newTasks);
	};
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
		padding: 12,
	},
	title: {
		width: "100%",
		fontSize: 20,
		fontWeight: "bold",
	},
});
