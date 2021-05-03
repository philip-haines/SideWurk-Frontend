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
