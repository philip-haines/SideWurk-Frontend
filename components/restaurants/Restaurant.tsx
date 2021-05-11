import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
	const navigation = useNavigation();
	const handlePress = () => {
		navigation.navigate("TaskListScreen", { id: restaurant.id });
	};
	return (
		<View>
			<Pressable onPress={handlePress}>
				<View>
					<Text>{restaurant.title}</Text>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
