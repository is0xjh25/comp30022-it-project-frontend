import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PageNavigator from './pages/PageNavigator'

class App extends React.Component {
  render() {
      return( 
      <BrowserRouter>
        <PageNavigator/>
      </BrowserRouter>);
  }
}

export default App;
