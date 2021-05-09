import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
	NativeSyntheticEvent,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_TASK_LIST } from "../../Apollo/Queries";
import { CREATE_TASK, DELETE_TASK } from "../../Apollo/mutations";
import TaskListItem from "./TaskListItem";

const DELETE_BLOCK = gql`
	mutation deleteBlock($id: ID!) {
		deleteBlock(id: $id)
	}
`;

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
	const [blockTitle, setBlockTitle] = useState(block.title);

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});
	const [
		createTask,
		{ data: createTaskData, error: createTaskError },
	] = useMutation(CREATE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const [deleteTask, { loading: deleteTaskLoading }] = useMutation(
		DELETE_TASK,
		{
			refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
		}
	);

	const [deleteBlock, { loading: deleteBlockLoading }] = useMutation(
		DELETE_BLOCK,
		{
			refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
		}
	);

	const newTaskOnSubmit = () => {
		createTask({
			variables: {
				content: "",
				blockId: block.id,
			},
		});
	};

	const handleDelete = ({ nativeEvent }: NativeSyntheticEvent<{}>) => {
		if (nativeEvent.key === "Backspace" && blockTitle === "") {
			if (block.tasks.length === 0) {
				deleteBlock({
					variables: {
						id: block.id,
					},
				});
			}
		} else {
			return null;
		}
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
			<TextInput
				style={styles.title}
				value={blockTitle}
				onChangeText={setBlockTitle}
				editable={true}
				onKeyPress={handleDelete}
			/>
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
