import logo from './logo.svg';
import './App.css';
import Imdb from './components/Imdb';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
   <Header/>
      <Imdb />
<Footer/>
    </ApolloProvider>
  );
}

export default App;
