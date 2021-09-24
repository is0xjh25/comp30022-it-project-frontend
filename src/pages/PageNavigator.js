import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import Login from './Login/Login';

import Member from '../components/Members/Members'
import DisplayCustomer from '../components/Contact/DisplayCustomer';
import AddCustomer from '../components/Contact/AddCustomer';

function PageNavigator() {
    return (
        <Switch>

            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path ='/login'>
                <Login/>
            </Route>

            <Route path='/add'>
                <AddCustomer />
            </Route>

            <Route path='/'>
                <Home/>
            </Route>

            
        </Switch>
    );
}

export default PageNavigator;