import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

export default function slideRight(props) {
	const slideAnim = useRef(new Animated.Value(0)).current;

	const slideOut = () => {
		Animated.timing(slideAnim, {
			toValue: 400,
			duration: 2000,
		}).start();
	};

	useEffect(() => {
		return slideOut;
	}, []);

	return (
		<Animated.View
			style={[
				styles.fadingContainer,
				{
					transform: [
						{
							translateX: slideAnim,
						},
					],
				},
			]}
		>
			{props.children}
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fadingContainer: {
		padding: 1,
		// backgroundColor: "powderblue",
	},
	fadingText: {
		fontSize: 28,
	},
});
