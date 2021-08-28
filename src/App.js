import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import PageNavigator from './pages/PageNavigator';
import Swagger from './pages/Swagger/Swagger';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Swagger />
      <Home />
    </BrowserRouter>
  );
}

export default App;
