import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	FlatList,
	Alert,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "../components/TaskList/TaskList";
import { MY_TASK_LISTS_QUERY } from "../Apollo/Queries";

export default function TabTwoScreen() {
	const [taskLists, setTaskLists] = useState([]);

	const { data, error, loading } = useQuery(MY_TASK_LISTS_QUERY);
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

	return (
		<View style={styles.container}>
			<FlatList
				data={taskLists}
				renderItem={({ item }) => <TaskList taskList={item} />}
				style={{ width: "100%" }}
			/>
			<Pressable style={styles.addTaskListButton}>
				<Ionicons name="pencil" size={32} color="white" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	addTaskListButton: {
		height: 70,
		width: 70,
		backgroundColor: "#77df79",
		position: "absolute",
		alignSelf: "flex-end",
		bottom: 60,
		right: 30,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});
