import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";
import TaskList from "../components/TaskList/TaskList";
const MY_TASKLISTS_QUERY = gql`
	query myTaskLists {
		myTaskLists {
			id
			title
			progress
		}
	}
`;

export default function TabTwoScreen() {
	const [taskLists, setTaskLists] = useState([]);

	const [myTaskLists, { data, error, loading }] = useQuery(
		MY_TASKLISTS_QUERY
	);

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
