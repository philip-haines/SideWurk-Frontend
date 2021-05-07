import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskListItem from "./TaskListItem";
import { useMutation, gql } from "@apollo/client";
import { CREATE_TASK } from "../../Apollo/mutations";

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
	const [
		createTask,
		{ data: createTaskData, error: createTaskError },
	] = useMutation(CREATE_TASK);

	const newTaskOnSubmit = () => {
		console.log(block.id);
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
			<Text>{block.title}</Text>
			<FlatList
				data={block.tasks}
				renderItem={({ item }) => {
					return (
						<TaskListItem
							task={item}
							newTaskOnSubmit={newTaskOnSubmit}
							// deleteTaskOnBackspace={deleteTaskOnBackspace}
						/>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
