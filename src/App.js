import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';

import PageNavigator from './pages/PageNavigator'
import Swagger from './pages/Swagger/Swagger';

function App() {
  return (
    <BrowserRouter>
      <Swagger />
    </BrowserRouter>
  );
}

export default App;
