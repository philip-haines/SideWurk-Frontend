import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	TextInput,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { Text, View } from "../components/Themed";
import User from "../components/user/User";

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
	const { data: searchData, loading: usersLoading } = useQuery(GET_USERS, {
		variables: {
			text: userSearch,
		},
	});

	useEffect(() => {
		if (searchData) {
			setUserData(searchData.getUsers);
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
			{!userData ? <ActivityIndicator /> : null}
			<View style={styles.listContainer}>
				<FlatList
					data={userData}
					renderItem={({ item }) => (
						<User loading={usersLoading} user={item} />
					)}
					style={{ width: "100%" }}
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

	listContainer: {
		width: "100%",
		paddingLeft: 10,
	},
});
