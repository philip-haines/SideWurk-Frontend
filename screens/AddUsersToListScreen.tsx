import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	TextInput,
	FlatList,
	ActivityIndicator,
	Pressable,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import User from "../components/user/User";
import { GET_USERS } from "../Apollo/Queries";

import { useMutation, useQuery, gql } from "@apollo/client";

const ADD_USER_TO_RESTAURANT = gql`
	mutation addUserToRestaurant($userId: ID!, $restaurantId: ID!) {
		addUserToRestaurant(restaurantId: $restaurantId, userId: $userId) {
			id
			title
			users {
				id
				email
			}
		}
	}
`;

export default function AddUsersToListScreen() {
	const route = useRoute();
	const id: number = route.params ? route.params.id : null;
	console.log(route.params);
	const users: [] = route.params ? route.params.users : null;
	const [userSearch, setUserSearch] = useState("");
	const [addUsers, setAddUsers] = useState([]);
	const [listData, setListData] = useState(
		userData
			? userData.map((user) => {
					key: user.id;
					name: user.name;
					email: user.email;
			  })
			: []
	);
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

	const [addUserToRestaurant] = useMutation(ADD_USER_TO_RESTAURANT);

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

	// const renderUsers = () => {
	// 	return userData.map((user) => (
	// 		<User getUserId={getUserId} user={user} loading={usersLoading} />
	// 	));
	// };

	// const getUserId = (user) => {
	// 	const foundDataUser = userData.find(
	// 		(dataUser) => user.id === dataUser.id
	// 	);
	// 	const foundAddUser = addUsers.find((addUser) => user.id === addUser.id);

	// 	if (!foundAddUser) {
	// 		setAddUsers((addUsers) => [...addUsers, foundDataUser]);
	// 	} else {
	// 		const newAddUsers = addUsers.filter(
	// 			(addUser) => user.id === addUser
	// 		);
	// 		setAddUsers([...newAddUsers]);
	// 	}
	// };

	// const renderButton = () => {
	// 	if (addUsers.length === 0) {
	// 		return null;
	// 	} else {
	// 		return (
	// 			<Pressable style={styles.addUserButton}>
	// 				<Text>Add Users</Text>
	// 			</Pressable>
	// 		);
	// 	}
	// };

	const handleAdd = (user) => {
		// console.log(user.id);
		addUserToRestaurant({
			variables: {
				userId: user.id,
				restaurantId: id,
			},
		});
		const newUserSearch = userData.filter(
			(stateUser) => user.id !== stateUser.id
		);
		setUserData(newUserSearch);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			style={{ flex: 1 }}
		>
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
				{/* <ScrollView style={styles.listContainer}> */}
				{usersLoading ? (
					<ActivityIndicator />
				) : (
					<SwipeListView
						data={userData}
						renderItem={(data, rowMap) => {
							return <User user={data.item} />;
						}}
						renderHiddenItem={(data, rowMap) => {
							return (
								<Pressable
									style={styles.addUserButton}
									onPress={(_) => {
										handleAdd(data.item);
									}}
								></Pressable>
							);
						}}
						leftOpenValue={75}
						closeOnRowPress={true}
					/>
				)}
				{/* </ScrollView> */}
				{/* {renderButton()} */}
			</View>
		</KeyboardAvoidingView>
	);
}

{
	/* <ActivityIndicator /> : renderUsers() */
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

	addUserButton: {
		// marginVertical: 15,
		backgroundColor: "#715AFF",
		height: "100%",
		// borderRadius: 15,
		// alignItems: "center",
		// justifyContent: "center",
	},
});
