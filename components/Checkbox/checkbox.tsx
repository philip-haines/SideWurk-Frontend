import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CheckBoxProps {
	isChecked: boolean;
	onPress: () => void;
}

export default function Checkbox(props: CheckBoxProps) {
	const { onPress, isChecked } = props;
	const name = props.isChecked ? "check-box" : "check-box-outline-blank";
	return (
		<View>
			<Pressable onPress={onPress}>
				<MaterialIcons name={name} size={24} color="black" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
