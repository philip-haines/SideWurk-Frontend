import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
	const navigation = useNavigation();
	useEffect(() => {
		const checkUser = async () => {
			if (await isAuthenticated()) {
				navigation.navigate("Home");
			} else {
				navigation.navigate("SignInScreen");
			}
		};
		checkUser();
	}, []);

	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (error) {
			error.message;
		}
	};

	const isAuthenticated = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			// removeToken();
			if (token) {
				return token;
			}
		} catch (error) {
			throw new Error("Authentication error. Please try again");
		}
	};
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<ActivityIndicator />
		</View>
	);
}

const styles = StyleSheet.create({});
