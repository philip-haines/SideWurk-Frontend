import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $name: String!) {
		signUp(input: { email: $email, password: $password, name: $name }) {
			token
			user {
				id
				name
			}
		}
	}
`;

export default function SignUPScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const navigation = useNavigation();

	const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
	// console.log(data);
	// console.log(error);
	const onSubmit = () => {
		signUp({ variables: { email: email, password: password, name: name } });
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
