import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Login from './Login/Login';

import ToDoList from '../components/ToDoList/ToDoList';

function PageNavigator() {
    return (
        <Switch>

            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path ='/login'>
                <Login/>
            </Route>
            <Route path='/'>
                <Home/>
            </Route>
            <Route path='/todo'>
                <ToDoList/>
            </Route>
            
        </Switch>
    );
}

export default PageNavigator;