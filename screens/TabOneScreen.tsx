import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "../components/Themed";
import TaskListItem from "../components/TaskList/TaskListItem";

export default function TabOneScreen() {
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
	return (
		<View style={styles.container}>
			<Text style={styles.title}>This is going to update</Text>
			<FlatList
				data={tasks}
				renderItem={({ item }) => <TaskListItem task={item} />}
				style={{ width: "100%" }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
