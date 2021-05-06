import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	TextInput,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { Text, View } from "../components/Themed";
import User from "../components/user/User";
import { GET_USERS } from "../Apollo/Queries";

import { useQuery } from "@apollo/client";

export default function AddUsersToListScreen() {
	const [userSearch, setUserSearch] = useState("");
	const [userData, setUserData] = useState([]);
	const {
		data: searchData,
		loading: usersLoading,
		error: userError,
	} = useQuery(GET_USERS, {
		variables: {
			text: userSearch,
		},
	});

	useEffect(() => {
		if (userError) {
			return;
		}

		if (searchData) {
			setUserData(searchData.getUsers);
		}

		if (userSearch === "") {
			setUserData([]);
		}
	}, [searchData]);

	const renderUsers = () => {
		return userData.map((user) => (
			<User user={user} loading={usersLoading} />
		));
	};

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
				{usersLoading ? <ActivityIndicator /> : renderUsers()}

				{/* <FlatList
					data={userData}
					renderItem={({ item }) => (
						<User loading={usersLoading} user={item} />
					)}
					style={{ width: "100%" }}
				/> */}
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
