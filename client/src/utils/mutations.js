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
      addMovie(
        title: $title,
        name: $name,
        rating: $rating,
        year: $year,
        plot: $plot,
        image: $image,
      ){
        title
        name
        rating
        year
        plot
        image
      }
    }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteFavouriteMovie($movie: String!) {
    deleteFavouriteMovie(movie: $movie) {
      _id
    }
  }
`;