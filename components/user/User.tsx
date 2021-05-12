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
			<Text style={{ color: "#2E2D4D", fontWeight: "bold" }}>
				{user.name}
			</Text>
			<Text style={{ color: "#2E2D4D" }}>{user.email}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
