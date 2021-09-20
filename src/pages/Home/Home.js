import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import './Home.css';


import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../components/Manage/Organization';
import Department from '../../components/Manage/Department';
import Customer from '../../components/Contact/Customer'
import DisplayCustomer from '../../components/Contact/DisplayCustomer'

import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
  useHistory
} from "react-router-dom";

require('dotenv').config();

function Manage(props) {
  let {path, url} = useRouteMatch();
  const [organizationDisplay, setOrganizationDisplay] = useState(-1);

  return(
    <Switch>
      <Route exact path={`${path}`}>
        <Organization/>
      </Route>
      <Route exact path={`${path}/:orgId`}>
        <Department/>
      </Route>
      <Route path={`${path}/:orgId/:depId`}>
        <Members/>
      </Route>
    </Switch>
  )
}


// A home component is rendered when path '/' is matched
function Home(props) {
  let {path, url} = useRouteMatch();
  const history = useHistory();

  const [selectedPage, setSelectedPage] = useState('');

  const changePage = function(toPage) {
    setSelectedPage(toPage);
    history.push(`/${toPage}`);
  }

    if(this.state.selectedPage === 'Contacts') {
      body = (
        <Customer/>
      )
    }

  return(
    <div className='home-main-container'>
      <div className='sidebar-container'>
        <Sidebar selectedPage={selectedPage} changePage={changePage}/>
      </div>
      <div className='sidebar-body'>
        <Switch>
          <Route exact path={`${url}`}>
            <Redirect to={`${url}Dashboard`}/>
          </Route>
          <Route path={`${url}Dashboard`}>
            
          </Route>
          <Route path={`${url}Manage`}>
            <Manage/>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Home;
