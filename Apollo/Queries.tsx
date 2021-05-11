import { gql } from "@apollo/client";

export const GET_TASK_LIST = gql`
	query getTaskList($id: ID!) {
		getTaskList(id: $id) {
			id
			title
			blocks {
				id
				title
				progress
				tasks {
					id
					content
					isComplete
				}
			}
		}
	}
`;

export const MY_TASK_LISTS_QUERY = gql`
	query myTaskLists($restaurantId: ID!) {
		myTaskLists(restaurantId: $restaurantId) {
			id
			title
		}
	}
`;

export const GET_USERS = gql`
	query getUsers($text: String) {
		getUsers(input: { text: $text }) {
			id
			email
			name
		}
	}
`;

export const MY_RESTAURANTS = gql`
	query myRestaurants {
		myRestaurants {
			id
			title
			users {
				id
				name
				email
			}
			taskLists {
				id
				title
			}
		}
	}
`;
