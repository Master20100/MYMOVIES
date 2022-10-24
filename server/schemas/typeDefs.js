const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        favourite_movies: [Movie]!
    }

    type Movie {
        _id: ID
        name: String
        title: String
        plot: String
        image: String
        rating: String
        year: String
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
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        addMovie(name: String!, title: String!, plot: String!, image: String!, rating: String!, year: String!, trailer: String, live_stream_url: String): Movie
        addFavouriteMovie(movieId: ID!): User
    }
`;

module.exports = typeDefs;