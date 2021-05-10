import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
	NativeSyntheticEvent,
	Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_TASK_LIST } from "../../Apollo/Queries";
import {
	CREATE_TASK,
	DELETE_TASK,
	DELETE_BLOCK,
	UPDATE_BLOCK_TITLE,
} from "../../Apollo/mutations";
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
		progress: number;
		tasks: [Task];
	};
	showCompleted: boolean;
}

export default function Block({ block, showCompleted }: BlockProps) {
	const route = useRoute();
	const id: number = route.params ? route.params.id : null;
	const [blockTitle, setBlockTitle] = useState(block.title);

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});
	const [createTask] = useMutation(CREATE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const [deleteTask] = useMutation(DELETE_TASK, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const [updateBlock] = useMutation(UPDATE_BLOCK_TITLE, {
		refetchQueries: [{ query: GET_TASK_LIST, variables: { id } }],
	});

	const [deleteBlock] = useMutation(DELETE_BLOCK, {
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

	const updateBlockTitle = () => {
		console.log("you hit me on end editing");
		updateBlock({
			variables: {
				id: block.id,
				title: blockTitle,
			},
		});
	};

	const deleteBlockWithTasks = () => {
		block.tasks.forEach((task) =>
			deleteTask({
				variables: {
					id: task.id,
				},
			})
		);
		deleteBlock({
			variables: {
				id: block.id,
			},
		});
	};

	const taskAlert = () => {
		Alert.alert(
			"Block Still Has Tasks",
			"Deleting this block will delete all associated tasks.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => deleteBlockWithTasks(),
					style: "destructive",
				},
			]
		);
	};

	const handleDelete = ({ nativeEvent }: NativeSyntheticEvent<{}>) => {
		if (nativeEvent.key === "Backspace" && blockTitle === "") {
			if (!block.tasks.length) {
				deleteBlock({
					variables: {
						id: block.id,
					},
				});
			} else {
				taskAlert();
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

	const toggleShowCompletedTasks = () => {
		if (!showCompleted) {
			const taskData = block.tasks.filter(
				(task) => task.isComplete !== true
			);
			return taskData;
		} else {
			return block.tasks;
		}
	};

	return (
		<View>
			<TextInput
				placeholder="Title"
				style={styles.title}
				value={blockTitle}
				onChangeText={setBlockTitle}
				editable={true}
				onKeyPress={handleDelete}
				onSubmitEditing={newTaskOnSubmit}
				onEndEditing={updateBlockTitle}
			/>
			<View style={{ height: 15, width: 60, backgroundColor: "red" }}>
				<View
					style={{
						height: 15,
						width: `${block.progress}%`,
						backgroundColor: "black",
					}}
				></View>
			</View>
			<FlatList
				data={toggleShowCompletedTasks()}
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
