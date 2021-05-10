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
import ProgressCircle from "react-native-progress-circle";
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
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
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
				<ProgressCircle
					percent={block.progress}
					radius={35}
					borderWidth={8}
					color="black"
					shadowColor={"#fbfbfc"}
					bgColor="#fff"
				>
					<Text style={{ fontSize: 14 }}>{`${Math.round(
						block.progress
					)}%`}</Text>
				</ProgressCircle>
				{/* <View style={styles.outerProgress}>
					<View
						style={[
							styles.innerProgress,
							{ width: `${block.progress}%` },
						]}
					>
						<View style={styles.innerCircle}></View>
					</View>
				</View> */}
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
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
	},

	// outerProgress: {
	// 	width: 30,
	// 	height: 30,
	// 	borderRadius: 100,
	// 	justifyContent: "center",
	// 	alignItems: "flex-start",
	// 	backgroundColor: "red",
	// },

	// innerProgress: {
	// 	height: "100%",
	// 	borderRadius: 100,
	// 	backgroundColor: "black",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	transform: [{ rotateZ: "45deg" }],
	// },

	// innerCircle: {
	// 	height: 15,
	// 	width: 15,
	// 	borderRadius: 100,
	// 	backgroundColor: "white",
	// },
});
