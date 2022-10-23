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
