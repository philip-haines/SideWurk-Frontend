import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";

import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
	query getUsers($text: String) {
		getUsers(input: { text: $text }) {
			id
			email
			name
		}
	}
`;

export default function AddUsersToListScreen() {
	const [userSearch, setUserSearch] = useState("");
	const [userData, setUserData] = useState([]);
	const { data: usersData } = useQuery(GET_USERS, {
		variables: {
			text: userSearch,
		},
	});

	useEffect(() => {
		if (usersData) {
			setUserData(usersData);
			console.log(userData);
		}
	}, [userSearch]);
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Find by Email or Name"
					value={userSearch}
					onChangeText={setUserSearch}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 1,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
	},

	inputContainer: {
		width: "100%",
		paddingHorizontal: 10,
		borderTopColor: "#ccc",
		borderBottomColor: "#ccc",
		borderBottomWidth: 0.25,
		borderTopWidth: 0.25,
		height: 50,
		justifyContent: "center",
	},

	searchInput: {
		width: "70%",
	},
});
