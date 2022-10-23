import logo from './logo.svg';
import './App.css';
import Imdb from './components/Imdb';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
   <Header/>
      <Imdb />
<Footer/>
    </>
  );
}

export default App;
