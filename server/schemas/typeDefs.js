const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        favourite_movies: [Movie]!
    }

    type Movie {
        _id: ID
        name: String
        description: String
        image: String
        rate: Number
        trailer: String
        live_stream_url: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        movies(username: String): [Movie]
        movie(movieId: ID!): Movie
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        addMovie(name: String!, description: String!, image: String!, rate: Number!, trailer: String!, live_stream_url: String!): Movie
        addFavouriteMovie(movieId: ID!): User
    }
`;

module.exports = typeDefs;