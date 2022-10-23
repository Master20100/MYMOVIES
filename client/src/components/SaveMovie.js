import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const SaveMovie = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMovie({
        variables: { movies },


        
      });

    } catch (err) {
      console.error(err);
    }
  };
  


// const MovieForm = () => {
//   const [name, setName] = useState('');

//   const [addMovie, { error }] = useMutation(ADD_MOVIE);

  

//   }