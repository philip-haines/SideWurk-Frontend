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
import { Octicons } from "@expo/vector-icons";
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
	const users: [] = route.params.users ? route.params.users : null;
	console.log(users);
	const [userSearch, setUserSearch] = useState("");
	// const [addUsers, setAddUsers] = useState([]);
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

	const renderUsers = () => {
		return users.map((user) => (
			<View>
				<View style={styles.currentUsersRow}>
					<View style={{ flexDirection: "row" }}>
						<View style={styles.userCircle}>
							<Text style={styles.circleText}>
								{evaluateUserCircle(user)}
							</Text>
						</View>
						<User user={user} />
					</View>
					<Octicons
						name="kebab-vertical"
						size={20}
						color="#2E2D4D"
						style={{ paddingHorizontal: 20 }}
					/>
				</View>
			</View>
		));
	};

	const evaluateUserCircle = (user) => {
		const name = user.name.split(" ");
		if (name[0] && name[1]) {
			return `${name[0][0]}${name[1][0]}`;
		} else {
			return name[0][0];
		}
	};

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

	const handleAdd = (user) => {
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
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Find by Email or Name"
					value={userSearch}
					onChangeText={setUserSearch}
				/>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
				style={{ flex: 1 }}
			>
				{!userData ? <ActivityIndicator /> : null}
				{usersLoading ? (
					<ActivityIndicator />
				) : (
					<SwipeListView
						data={userData}
						renderItem={(data, rowMap) => {
							return (
								<View style={styles.userResultsContainer}>
									<View style={styles.userResults}>
										<User user={data.item} />
									</View>
								</View>
							);
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
						style={styles.swipeList}
					/>
				)}
			</KeyboardAvoidingView>
			<View style={{ width: "100%", paddingLeft: 10 }}>
				<View>
					<Text style={styles.title}>Current Collaborators</Text>
				</View>
				<ScrollView style={{ marginBottom: 30 }}>
					{renderUsers()}
				</ScrollView>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
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

	userResults: {
		backgroundColor: "white",
	},

	swipeList: {
		height: 200,
		backgroundColor: "black",
	},

	addUserButton: {
		backgroundColor: "#715AFF",
		height: "100%",
	},

	currentUsersRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		alignItems: "center",
	},

	userCircle: {
		height: 25,
		width: 25,
		borderRadius: 50,
		backgroundColor: "#715AFF",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
	},

	circleText: {
		color: "white",
		fontWeight: "bold",
	},
});
