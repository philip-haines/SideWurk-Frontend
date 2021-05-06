import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "../Checkbox/checkbox";

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
	const [isChecked, setIsChecked] = useState(false);

	console.log("This is user from user pag", user);

	const addToUsers = () => {
		console.log("you hit me");
	};

	const handlePress = () => {
		setIsChecked(!isChecked);
		addToUsers();
	};
	return (
		<Pressable>
			<View style={styles.userResultsContainer}>
				<View style={styles.userResults}>
					<Checkbox isChecked={isChecked} onPress={handlePress} />
					<Text>{user.name}</Text>
					<Text>{user.email}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
