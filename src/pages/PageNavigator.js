import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Swagger from './Swagger/Swagger';
import Home from './Home/Home';
import OrgSample from './Organisation/OrgSample';
import Org from './Organisation/Organisation';
import Album from './Organisation/Album';

function PageNavigator() {
    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/swagger'>
                <Swagger/>
            </Route>
            <Route path='/orgSample'>
                <OrgSample/>
            </Route>
            <Route path='/org'>
                <Org/>
            </Route>
            <Route path='/album'>
                <Album/>
            </Route>
        </Switch>

    )
}

export default PageNavigator;