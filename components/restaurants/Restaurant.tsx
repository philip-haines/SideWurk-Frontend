import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface User {
	user: {
		id: number;
		name: string;
		email: string;
	};
}

interface RestaurantProps {
	restaurant: {
		id: number;
		title: string;
		users: [User];
	};
}

export default function Restaurant({ restaurant }: RestaurantProps) {
	return (
		<View>
			<Text>{restaurant.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
