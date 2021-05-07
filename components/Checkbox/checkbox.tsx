import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

interface CheckBoxProps {
	isChecked: boolean;
	onPress: () => void;
}

export default function Checkbox(props: CheckBoxProps) {
	const { onPress, isChecked } = props;
	const name = props.isChecked ? "check-box" : "check-box-outline-blank";
	const color = !props.isChecked ? "black" : "#ccc";
	return (
		<View>
			<Pressable onPress={onPress}>
				<MaterialIcons name={name} size={24} color={color} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
