import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Login from './Login/Login';
import DisplayUser from '../components/User/DisplayUser';


function PageNavigator() {
    return (
        <Switch>

            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path ='/login'>
                <Login/>
            </Route>
            <Route path ='/user'>
                <DisplayUser/>
            </Route>
            <Route path='/'>
                <Home/>
            </Route>

            
        </Switch>
    );
}

export default PageNavigator;