import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	TextInput,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Checkbox from "../Checkbox/checkbox";

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

	const onSubmit = () => {
		newTaskOnSubmit();
	};
	useEffect(() => {
		if (!task) {
			return;
		}
		setIsChecked(task.isComplete);
		setContent(task.content);
	}, [task]);

	useEffect(() => {
		if (input.current) {
			input?.current?.focus();
		}
	}, []);

	const onKeyPress = ({ nativeEvent }) => {
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
					}}
				/>
			</View>
			<View>
				<TextInput
					ref={input}
					value={content}
					onChangeText={setContent}
					style={{
						flex: 1,
						marginLeft: 12,
						fontSize: 18,
						width: "90%",
					}}
					multiline
					onSubmitEditing={onSubmit}
					onKeyPress={onKeyPress}
					blurOnSubmit
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
