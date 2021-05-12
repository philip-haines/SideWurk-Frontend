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
	loading: boolean;
	getUserId: () => void;
}

export default function User({ user, loading, getUserId }: UserProps) {
	// const [isChecked, setIsChecked] = useState(false);
	const [addUsersArray, setAddUsersArray] = useState([]);

	// const handlePress = () => {
	// 	setIsChecked(!isChecked);
	// };

	return (
		<Pressable>
			<View style={styles.userResultsContainer}>
				<View style={styles.userResults}>
					{/* <Checkbox isChecked={isChecked} onPress={handlePress} /> */}
					<Text>{user.name}</Text>
					<Text>{user.email}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	userResults: {
		backgroundColor: "white",
	},
});
