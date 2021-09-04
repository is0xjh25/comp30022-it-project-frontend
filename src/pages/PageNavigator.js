import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import OrgSample from './Organisation/OrgSample';

function PageNavigator() {
    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path ='/org'>
                <OrgSample/>
            </Route>
        </Switch>

    )
}

export default PageNavigator;