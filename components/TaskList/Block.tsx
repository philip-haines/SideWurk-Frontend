import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_TASK_LIST } from "../../Apollo/Queries";
import { CREATE_TASK, DELETE_TASK } from "../../Apollo/mutations";
import TaskListItem from "./TaskListItem";

interface Task {
	task: {
		id: number;
		content: string;
		isComplete: boolean;
	};
}
interface BlockProps {
	block: {
		id: number;
		title: string;
		tasks: [Task];
	};
}

export default function Block({ block }: BlockProps) {
	const route = useRoute();
	const id: number = route.params ? route.params.id : null;

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});
	const [
		createTask,
		{ data: createTaskData, error: createTaskError },
	] = useMutation(CREATE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const newTaskOnSubmit = () => {
		createTask({
			variables: {
				content: "",
				blockId: block.id,
			},
		});
	};

	const deleteTaskOnBackspace = (passedTask: Task) => {
		deleteTask({
			variables: {
				id: passedTask.id,
			},
		});
	};

	return (
		<View>
			<TextInput style={styles.title} onSubmitEditing={newTaskOnSubmit}>
				{block.title}
			</TextInput>
			<FlatList
				data={block.tasks}
				renderItem={({ item }) => {
					return (
						<TaskListItem
							task={item}
							taskListId={id}
							newTaskOnSubmit={newTaskOnSubmit}
							deleteTaskOnBackspace={deleteTaskOnBackspace}
						/>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		width: "100%",
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
	},
});
