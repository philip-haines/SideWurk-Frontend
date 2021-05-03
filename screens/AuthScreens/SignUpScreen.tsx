import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	ActivityIndicator,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

import { SIGN_UP_MUTATION } from "../../Apollo/mutations";

export default function SignUPScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const navigation = useNavigation();

	const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

	const onSubmit = () => {
		signUp({ variables: { email, name, password } });
		if (error) {
			Alert.alert("Error signing up. Try again.");
		}
		if (data) {
			AsyncStorage.setItem("token", data.signUp.token)
				.then(() => navigation.navigate("Home"))
				.then(() => {
					setName("");
					setEmail("");
					setPassword("");
				});
		}
	};
	return (
		<View style={{ padding: 20 }}>
			<TextInput
				placeholder="John Smith"
				value={name}
				onChangeText={setName}
				style={{
					color: "black",
					fontSize: 18,
					width: "100%",
					marginVertical: 25,
				}}
			/>
			<TextInput
				placeholder="example@youremail.com"
				value={email}
				onChangeText={setEmail}
				style={{
					color: "black",
					fontSize: 18,
					width: "100%",
					marginVertical: 25,
				}}
			/>

			<TextInput
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={{
					color: "black",
					fontSize: 18,
					width: "100%",
					marginVertical: 25,
				}}
			/>

			<Pressable
				disabled={loading}
				onPress={onSubmit}
				style={{
					marginVertical: 15,
					backgroundColor: "#F54944",
					height: 50,
					borderRadius: 8,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{loading && <ActivityIndicator />}
				<Text
					style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
				>
					Sign Up
				</Text>
			</Pressable>

			<Pressable
				disabled={loading}
				onPress={() => navigation.navigate("SignInScreen")}
				style={{
					marginVertical: 15,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						color: "#F54944",
						fontSize: 18,
						fontWeight: "bold",
					}}
				>
					Have an account? Sign In
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
