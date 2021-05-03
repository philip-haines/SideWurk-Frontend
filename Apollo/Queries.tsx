import { gql } from "@apollo/client";

export const GET_TASK_LIST = gql`
	query getTaskList($id: ID!) {
		getTaskList(id: $id) {
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
