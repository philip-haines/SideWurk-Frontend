import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Checkbox from "../Checkbox/checkbox";

interface TaskListItemProps {
	task: {
		id: number;
		content: string;
		isComplete: boolean;
	};
}

export default function TaskListItem(props: TaskListItemProps) {
	const { task } = props;
	const [isChecked, setIsChecked] = useState(false);
	const [content, setContent] = useState("");
	useEffect(() => {
		if (!task) {
			return;
		}
		setIsChecked(task.isComplete);
		setContent(task.content);
	}, [task]);
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
					}}
				/>
			</View>
			<TextInput
				value={content}
				onChangeText={setContent}
				style={{ flex: 1, marginLeft: 12, fontSize: 18 }}
				multiline
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
