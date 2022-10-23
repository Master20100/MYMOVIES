import logo from './logo.svg';
import './App.css';
import Imdb from './components/Imdb';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Route,Routes,Router } from 'react-router-dom';

function App() {
  return (
   
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/Login">
</Route>
</Routes>
</Router>
      {/* <Imdb /> */}
    </div>
  );
}

export default App;
