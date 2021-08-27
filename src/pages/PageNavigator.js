import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';

function PageNavigator() {
    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/swagger'>
                <Swagger/>
            </Route>
        </Switch>

    )
}

export default PageNavigator;