import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";

import Checkbox from "../components/Checkbox/checkbox";

export default function TabOneScreen() {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>This is going to update</Text>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<View>
					<Checkbox
						isChecked={isChecked}
						onPress={() => {
							setIsChecked(!isChecked);
						}}
					/>
				</View>
				<TextInput
					style={{ flex: 1, marginLeft: 12, fontSize: 18 }}
					multiline
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
