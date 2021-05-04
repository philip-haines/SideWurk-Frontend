import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useMutation, gql } from "@apollo/client";

import Checkbox from "../Checkbox/checkbox";
import { UPDATE_TASK } from "../../Apollo/mutations";

interface TaskListItemProps {
	task: {
		id: number;
		content: string;
		isComplete: boolean;
	};
	newTaskOnSubmit: () => void;
}

export default function TaskListItem({
	task,
	newTaskOnSubmit,
}: TaskListItemProps) {
	const [isChecked, setIsChecked] = useState(false);
	const [content, setContent] = useState("");
	const input = useRef(null);
	const [updateTask] = useMutation(UPDATE_TASK);

	useEffect(() => {
		if (input.current) {
			input?.current?.focus();
		}
	}, []);

	useEffect(() => {
		if (!task) {
			return;
		}
		setIsChecked(task.isComplete);
		setContent(task.content);
	}, [task]);

	const handleUpdate = () => {
		updateTask({
			variables: {
				id: task.id,
				content,
				isComplete: isChecked,
			},
		});
	};
	const onSubmit = () => {
		newTaskOnSubmit();
	};

	const handleDelete = ({ nativeEvent }) => {
		if (nativeEvent.key === "Backspace" && content === "") {
			console.warn("Delete Item");
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginVertical: 3,
			}}
		>
			<View>
				<Checkbox
					isChecked={isChecked}
					onPress={() => {
						setIsChecked(!isChecked);
						handleUpdate();
					}}
				/>
			</View>
			<View>
				<TextInput
					ref={input}
					value={content}
					style={{
						flex: 1,
						marginLeft: 12,
						fontSize: 18,
						width: "100%",
					}}
					multiline
					onChangeText={setContent}
					onKeyPress={handleDelete}
					onEndEditing={handleUpdate}
					onSubmitEditing={onSubmit}
					blurOnSubmit
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
