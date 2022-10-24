import './App.css';
import Imdb from './components/Imdb';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';
import Header from './components/Header';
import Footer from './components/Footer';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
   <Header/>
   <Routes>
   <Route 
      path="/"
      element={<Home />}
      />
   <Route 
      path="/About"
      element={<About />}
      />
   <Route 
      path="/Login"
      element={<Login />}
      />
   <Route 
      path="/Register"
      element={<Register />}
      />
   <Route 
      path="/Imdb"
      element={<Imdb />}
      />
   <Route 
      path="/User"
      element={<User />}
      />
   
      

      </Routes>

<Footer/>
</Router>
    </ApolloProvider>
  );
}

export default App;




