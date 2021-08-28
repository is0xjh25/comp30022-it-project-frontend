import React from 'react';
import {Router, Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Login from './Login/Login';

function PageNavigator() {
    return (
        <Switch>
            <Route excat path ='/' component={Home}></Route>
            <Route excat path ='/swagger' component={Swagger}></Route>
            <Route excat path ='/login' component={Login}></Route>
        </Switch>
    );
}

export default PageNavigator;