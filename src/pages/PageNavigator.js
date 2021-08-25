import React from 'react';
import {Router, Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';

function PageNavigator() {
    return (
        <Switch>
            <Route excat path ='/' component={Home}></Route>
            <Route excat path ='/swagger' component={Swagger}></Route>
        </Switch>

    )
}

export default PageNavigator;