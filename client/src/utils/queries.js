import { gql } from "@apollo/client";

export const QUERY_MOVIES = gql`
  query allMovies {
    movies {
      _id
      title
      name
      year
      plot
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      email
      _id
      favourite_movies {
        _id
        title
        name
        plot
        year
        rating
        image
      }
    }
  }
`;
