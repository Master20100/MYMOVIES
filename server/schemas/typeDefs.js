const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        favourite_movies: [Movie]!
    }

    type Movie {
        _id: ID
        title: String
        name: String
        rating: String
        year: String
        plot: String
        image: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        movies(email: String): [Movie]
        movie(movieId: ID!): Movie
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        addMovie(title: String!, name: String!, rating: String!, year: String!, plot: String!, image: String!): Movie
        addFavouriteMovie(movieId: ID!): User
        deleteFavouriteMovie(movieId: ID!): User
    }
`;

module.exports = typeDefs;