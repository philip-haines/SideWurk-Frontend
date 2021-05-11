/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskScreen from "../screens/TaskScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";
import AddUsersScreen from "../screens/AddUsersToListScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import { RootStackParamList } from "../types";
// import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="SplashScreen"
				component={SplashScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SignInScreen"
				component={SignInScreen}
				options={{ title: "Sign In" }}
			/>
			<Stack.Screen
				name="SignUpScreen"
				component={SignUpScreen}
				options={{ title: "Create Account" }}
			/>
			<Stack.Screen
				name="Home"
				component={RestaurantScreen}
				options={{ title: "Restaurants" }}
			/>

			{/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
			<Stack.Screen name="TaskListScreen" component={TaskListScreen} />
			<Stack.Screen name="TaskScreen" component={TaskScreen} />
			<Stack.Screen name="AddUsersScreen" component={AddUsersScreen} />
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
		</Stack.Navigator>
	);
}
