import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";
import TaskList from "../components/TaskList/TaskList";

export default function TabTwoScreen() {
	const [taskLists, setTaskLists] = useState([
		{
			id: 1,
			title: "Task List 1",
			createdAt: "2d",
		},
		{
			id: 2,
			title: "Task List 2",
			createdAt: "5d",
		},
		{
			id: 3,
			title: "Task List 3",
			createdAt: "1d",
		},
	]);

	return (
		<View style={styles.container}>
			<FlatList
				data={taskLists}
				renderItem={({ item }) => <TaskList taskList={item} />}
				style={{ width: "100%" }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
