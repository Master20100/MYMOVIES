import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
addMovie(title: String!, 
    name: String!, 
    rating: String!,
    year: String!,
    plot: String! ): Movie


updateMovie(title: String!, 
    name: String!, 
    rating: String!,
    year: String!,
    plot: String! ): Movie


`;
