import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe ($userId: Id!) {
        user(userId: $userId) {
            username
            email
            savedBooks
        }
    }
`;