import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

export default function SignUPScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const navigation = useNavigation();

	const onSubmit = () => {};
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
				<Text
					style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
				>
					Sign Up
				</Text>
			</Pressable>

			<Pressable
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
