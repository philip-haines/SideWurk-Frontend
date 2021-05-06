import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface UserProps {
	user: {
		__typename: string;
		name: string;
		email: string;
		id: string;
	};
	loading: boolean;
}

export default function User({ user }: UserProps) {
	const [addUsers, setAddUsers] = useState([]);

	console.log("This is user from user pag", user);
	return (
		<Pressable>
			<View style={styles.userResultsContainer}>
				<View style={styles.userResults}>
					<Text>{user.name}</Text>
					<Text>{user.email}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
