import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Alert,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import Block from "../components/TaskList/Block";
import { GET_TASK_LIST } from "../Apollo/Queries";
import { CREATE_BLOCK } from "../Apollo/mutations";

import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen() {
	const navigation = useNavigation();
	const [title, setTitle] = useState("");
	const [blocks, setBlocks] = useState([]);
	const route = useRoute();
	const id: number = route.params.id;

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});

	const [
		createBlock,
		{ data: createBlockData, loading: createBlockLoading },
	] = useMutation(CREATE_BLOCK);

	useEffect(() => {
		if (error) {
			Alert.alert("Error fetching. Please try again.", error.message);
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			setTitle(data.getTaskList.title);
			setBlocks(data.getTaskList.blocks);
			navigation.setOptions({
				title: data.getTaskList.title,
			});
		}
	}, [data]);

	const handleNavigation = () => {
		navigation.navigate("AddUsersScreen", { id });
	};

	const handlePress = () => {
		createBlock({
			variables: {
				taskListId: id,
				title: "",
			},
		});
	};

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!blocks) {
		return null;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				{/* <View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginHorizontal: 15,
					}}
				>
					<TextInput
						style={styles.title}
						onEndEditing={() => handleTitleUpdate()}
						onChangeText={setTitle}
						placeholder={"Title"}
						value={title}
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					></View>
				</View> */}
				<View
					style={{
						height: "100%",
						width: "100%",
						alignSelf: "flex-start",
					}}
				>
					<FlatList
						data={blocks}
						renderItem={({ item, index }) => <Block block={item} />}
						style={{
							width: "100%",
							maxHeight: "95%",
						}}
					/>
					<View style={styles.buttonRow}>
						<Pressable
							style={[styles.button, styles.addBlock]}
							onPress={handlePress}
						>
							<FontAwesome name="plus" size={24} color="black" />
						</Pressable>
						<Pressable>
							<Text>Show completed</Text>
						</Pressable>
					</View>
				</View>
			</View>
			{/* <Pressable
				onPress={handleNavigation}
				style={{
					height: 40,
					width: 40,
					borderRadius: 5,
					backgroundColor: "green",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<MaterialIcons name="groups" size={24} color="white" />
			</Pressable> */}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		// justifyContent: "space-between",
		padding: 16,
	},
	title: {
		width: "100%",
		fontSize: 20,
		fontWeight: "bold",
	},

	buttonRow: {
		flexDirection: "row",
		paddingBottom: 30,
		paddingRight: 10,
		height: "12%",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	button: {
		height: 40,
		width: 40,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "black",
		borderWidth: 3,
	},

	addBlock: {},
});
