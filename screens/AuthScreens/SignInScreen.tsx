import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const onSubmit = () => {};
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
				onPress={onSubmit}
				style={{
					marginVertical: 15,
					backgroundColor: "#e33062",
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

			<Pressable
				onPress={() => navigation.navigate("SignUpScreen")}
				style={{
					marginVertical: 15,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						color: "#e33062",
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
