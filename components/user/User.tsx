import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Checkbox from "../Checkbox/checkbox";

interface UserProps {
	user: {
		__typename: string;
		name: string;
		email: string;
		id: string;
	};
	loading?: boolean;
}

export default function User({ user, loading }: UserProps) {
	return (
		<Pressable>
			<Text>{user.name}</Text>
			<Text>{user.email}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	userResults: {
		backgroundColor: "white",
	},
});
