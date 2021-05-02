import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Alert,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGN_IN_MUTATION = gql`
	mutation signIn($email: String!, $password: String!) {
		signIn(input: { email: $email, password: $password }) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

export default function SignInScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();
	const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

	useEffect(() => {
		if (error) {
			Alert.alert("Invalid credentials. Please try again.");
		}
	}, [error]);

	if (data) {
		AsyncStorage.setItem("token", data.signIn.token)
			.then(() => navigation.navigate("Home"))
			.then(() => {
				setEmail("");
				setPassword("");
			});
	}

	const onSubmit = () => {
		signIn({ variables: { email, password } });
	};
	return (
		<View style={{ padding: 20 }}>
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
					backgroundColor: "#38c6bd",
					height: 50,
					borderRadius: 8,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
				>
					Sign In
				</Text>
			</Pressable>
			{loading && <ActivityIndicator />}

			<Pressable
				disabled={loading}
				onPress={() => navigation.navigate("SignUpScreen")}
				style={{
					marginVertical: 15,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						color: "#38c6bd",
						fontSize: 18,
						fontWeight: "bold",
					}}
				>
					No account? Sign up
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
