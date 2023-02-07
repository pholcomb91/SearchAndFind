const { gql } = require('apollo-server-express');

input saveBookInput = {
    authors: [String],
    description: {String!},
    title: {String!},
    bookId: {String!},
    image: String,
    link: String
}

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(saveBookInput): User
        deleteBook(bookId: String!): User
    }
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }
    type Auth {
        token: ID
        user: User
    }
`

module.exports = typeDefs;