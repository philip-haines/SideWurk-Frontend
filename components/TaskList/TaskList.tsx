import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TaskListProps {
	taskList: {
		id: number;
		title: string;
		createdAt: string;
	};
}

export default function TaskList({ taskList }: TaskListProps) {
	const handlePress = () => {
		console.warn("open project once connected to back end");
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
					<Text style={styles.title}>{taskList.title}</Text>
					<Text style={styles.time}>{taskList.createdAt}</Text>
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
