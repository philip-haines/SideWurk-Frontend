# SideWürk

## Motivation
The idea for SideWürk came from the many hours I spend trying to look at greasy pieces of paoper to figure out what to prep for my station while working in kitchens. SideWürk utalizes shared tasklists inorder for employees to be up to date on what prep as been completed, as well as seeing where each station is in their overall prep work for the day. 

## Tech/Framework used
<b>Built with</b>
##### Backend ([repo](https://github.com/philip-haines/SideWurk-Backend))
- [Node JS](https://nodejs.org/en/)
- [Apollo Server](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [Mongo DB](https://www.mongodb.com/)
##### Frontend
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/tutorial/client/)

## Features
- React router
    - Use of React Router to transition user between home page, index pages, and show pages
- Async Storage
    - Use of Async Storage to save token locally on users device, and use token in request headers to authorize requests to the backend.
- Queries and Mutations
  - Use of GraphQL queries and mutations to make HTTP requests through the Apollo Client.
- Swipeables
  - Use of swipeables and swipeable list rendering components to accomidate a more native UX. 
- TypeScript

```
	const [createRestaurant] = useMutation(CREATE_RESTAURANT, {
		refetchQueries: [{ query: MY_RESTAURANTS }],
	});
 ```
 - Use of Mutations with Options 
    - The above will run a mutation to create a new restaurant. Inorder for the component to update, I had to use the refetchQueries mutation option to call the MY_RESTAURANT query again. This allowed for an instand UI update while still making sure that the UI matched the database.  
 
 ```
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
	});

	const isAuthenticated = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
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
```
- Use of JWT token, and authentication
  - The splash screen has built in logic to see if there is a valid user token. The splash screen autiomatically routes users to either the login page or the home screen based on the validity of the token making for a smooth UX when opening the application.
  
```
	const evaluateUserCircle = (user) => {
		const name = user.name.split(" ");
		if (name[0] && name[1]) {
			return `${name[0][0]}${name[1][0]}`;
		} else {
			return name[0][0];
		}
	};
```
- Conditionally render user circles for UI
  - The above evaluates if a user has entered in their full name or only the first name. If the user has only one name on their profile, their user bubble will only have the begining letter of that name in the user bubble, if the user entered in their full name, it will show an initial for both the first letter of the first name, and the first letter of the last name. 
 ## UI
[Video Demonstration](https://www.loom.com/share/518e727d42c7471e8038633750049a8c)


Contact Me
- [LinkedIn](https://www.linkedin.com/in/philip-haines/)
- [My Website](https://philiphaines.com)
