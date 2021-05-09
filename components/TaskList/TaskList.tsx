import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TaskListProps {
	taskList: {
		id: number;
		title: string;
		createdAt: string;
	};
	handleTitleUpdate: () => void;
}

export default function TaskList({
	taskList,
	handleTitleUpdate,
}: TaskListProps) {
	const navigation = useNavigation();
	const handlePress = () => {
		navigation.navigate("TaskScreen", { id: taskList.id });
	};

	const [title, setTitle] = useState(taskList.title);

	const handleUpdate = () => {
		const updatedTaskList = {
			id: taskList.id,
			title,
		};

		handleTitleUpdate(updatedTaskList);
	};

	return (
		<Pressable onPress={handlePress}>
			<View style={styles.root}>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons
						name="file-outline"
						size={24}
						color="black"
					/>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						value={title}
						style={styles.title}
						onChangeText={setTitle}
						onEndEditing={() => handleUpdate()}
					/>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		margin: 5,
	},

	root: {
		flexDirection: "row",
		width: "100%",
		padding: 10,
	},
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},

	time: {},
});
