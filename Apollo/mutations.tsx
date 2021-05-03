import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
	mutation signIn($email: String!, $password: String!) {
		signIn(input: { email: $email, password: $password }) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

export const SIGN_UP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $name: String!) {
		signUp(input: { email: $email, password: $password, name: $name }) {
			token
			user {
				id
				name
			}
		}
	}
`;

export const CREATE_TASK = gql`
	mutation createTask($content: String!, $taskListId: ID!) {
		createTask(content: $content, taskListId: $taskListId) {
			id
			content
			isComplete
			taskList {
				id
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
