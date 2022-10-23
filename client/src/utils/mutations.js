import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
mutation addMovie(
    $title: String!, 
    $name: String!, 
    $rating: String!,
    $year: String!,
    $plot: String! ){
        title
        name
        rating
        year
        plot
    }

`;