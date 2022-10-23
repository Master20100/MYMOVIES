import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
mutation addMovie(
    $title: String!, 
    $name: String!, 
    $rating: String!,
    $year: String!,
    $plot: String!,
    $image: String!,
    
    ){
        title
        name
        rating
        year
        plot
        image
    }

`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;






;