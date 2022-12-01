import { gql } from '@apollo/client';

export const ALL_TODOS = gql`
    query allTasks {
        tasks: allTasks {
            id
            title
            finished
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation updateTask($id: ID!, $finished: Boolean) {
        updateTask(id: $id, finished: $finished) {
            id
            finished
        }
    }
`

export const ADD_TODO = gql`
    mutation createTask($title: String!, $finished: Boolean!) {
        createTask(title: $title, finished: $finished) {
            id
            title
            finished
        }
    }
`

export const DELETE_TODO = gql`
    mutation removeTask($id: ID!) {
        removeTask(id: $id) {
            id
        }
    }
`