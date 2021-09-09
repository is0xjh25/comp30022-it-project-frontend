import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PageNavigator from './pages/PageNavigator'
import { Redirect } from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem("Token")===null) {
      <Redirect to={'./Login'} />
    } else {
      sessionStorage.setItem("Token", localStorage.getItem("Token"));
      <Redirect to={'./Home'} />
    }
  }

  render() {
      return( 
      <BrowserRouter>
        <PageNavigator/>
      </BrowserRouter>);
  }
}

export default App;
