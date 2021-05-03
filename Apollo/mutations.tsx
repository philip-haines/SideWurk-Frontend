import { gql } from "@apollo/client";

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
