import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Login from './Login/Login';
import Verify from './Login/Verify';

export default function PageNavigator() {
    return (
        <Switch>
            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path ='/login'>
                <Login/>
            </Route>
            <Route path ='/verify'>
                <Verify/>
            </Route>
            <Route path='/'>
                <Home/>
            </Route>
        </Switch>
    );
}