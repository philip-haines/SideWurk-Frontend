import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Task {
	task: {
		id: number;
		content: string;
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
	console.log(block);
	return (
		<View>
			<Text>{block.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
