import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	FlatList,
	Alert,
	ActivityIndicator,
	KeyboardAvoidingView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useQuery, useMutation, gql } from "@apollo/client";
import TaskList from "../components/TaskList/TaskList";
import { MY_TASK_LISTS_QUERY } from "../Apollo/Queries";

const CREATE_TASK_LIST = gql`
	mutation createTaskList($title: String!) {
		createTaskList(title: $title) {
			id
			title
			progress
			users {
				id
				name
			}
		}
	}
`;

export default function TabTwoScreen() {
	const [taskLists, setTaskLists] = useState([]);
	const [inputVisibility, setInputVisibility] = useState(false);
	const [taskListTitle, setTaskListTitle] = useState(String);
	const [icon, setIcon] = useState("pencil");

	const [createTaskList] = useMutation(CREATE_TASK_LIST, {
		refetchQueries: [{ query: MY_TASK_LISTS_QUERY }],
	});

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

	useEffect(() => {
		if (!inputVisibility) {
			setIcon("pencil");
		} else {
			if (taskListTitle !== "") {
				setIcon("send-sharp");
			} else {
				setIcon("close-sharp");
			}
		}
	}, [inputVisibility, taskListTitle]);

	if (loading) {
		return <ActivityIndicator />;
	}

	const handleClick = () => {
		setInputVisibility(!inputVisibility);
	};

	// createTaskList({
	// 	variables: {
	// 		title: taskListTitle,
	// 	},
	// });

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<FlatList
					data={taskLists}
					renderItem={({ item }) => <TaskList taskList={item} />}
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
		justifyContent: "flex-end",
	},

	bottomRow: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		height: 85,
		paddingBottom: 93,
	},

	addTaskListButton: {
		height: 70,
		width: 70,
		backgroundColor: "#77df79",
		alignSelf: "flex-end",
		position: "absolute",
		bottom: 60,
		right: 30,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},

	newTitleInput: {
		marginLeft: 20,
		width: "69%",
		paddingHorizontal: 10,
		borderTopColor: "#ccc",
		borderBottomColor: "#ccc",
		borderBottomWidth: 0.25,
		borderLeftColor: "#ccc",
		borderLeftWidth: 0.25,
		borderTopWidth: 0.25,
		height: 50,
		justifyContent: "center",
		backgroundColor: "white",
		zIndex: 10,
	},
});
