import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Org from './Manage/Organisation';
import Department from './Manage/Department';
import Login from './Login/Login';

function PageNavigator() {
    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path='/org'>
                <Org/>
            </Route>
            <Route path='/department'>
                <Department/>
            </Route>
            <Route path ='/login'>
                <Login/>
            </Route>
        </Switch>
    );
}

export default PageNavigator;