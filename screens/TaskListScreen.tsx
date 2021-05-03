import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";
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
