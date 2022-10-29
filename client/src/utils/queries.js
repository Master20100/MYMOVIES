import { gql } from '@apollo/client';

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
  me {
    user {
      name
      _id
      favorite_movies{
        id
      }
    }
  }
`