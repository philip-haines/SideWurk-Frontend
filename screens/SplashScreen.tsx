import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
	const navigation = useNavigation();
	useEffect(() => {
		if (isAuthenticated()) {
			navigation.navigate("Home");
		} else {
			navigation.navigate("SignInScreen");
		}
	}, []);

	const isAuthenticated = () => {
		return true;
	};
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<ActivityIndicator />
		</View>
	);
}

const styles = StyleSheet.create({});
