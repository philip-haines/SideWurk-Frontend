import React, { useState } from "react";
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
	loading: boolean;
}

export default function User({ user, loading }: UserProps) {
	const [addUsers, setAddUsers] = useState([]);
	const [isChecked, setIsChecked] = useState(false);

	const handlePress = () => {
		setIsChecked(!isChecked);
		setAddUsers((addUsers) => [user, ...addUsers]);
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
