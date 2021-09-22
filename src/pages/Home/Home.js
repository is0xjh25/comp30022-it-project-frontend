import React, { useState, useEffect } from 'react';
import './Home.css';


import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../components/Manage/Organization';
import Department from '../../components/Manage/Department';
import Contact from '../../components/Contact/CustomerTable';
import DisplayCustomer from '../../components/Contact/DisplayCustomer'

import { getDepartment, getOrganization } from '../../api/Manage';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    FormControl,
    Select,
    OutlinedInput,
    
} from '@mui/material'

import {
    Box,
    
} from '@mui/system'; // Select box for contacts(need to select two params)


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

function Contacts(props) {
    let {path, url} = useRouteMatch();
    const [dialogOpen, setDialogOpen] = useState(true);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [currentOrganiztion, setCurrentOrganization] = useState(0);
    const [currentDepartment, setCurrentDepartment] = useState(0);

    console.log(path);
    console.log(url);

    const handleDialogClose = function() {
        setDialogOpen(false);

    }

    const handleOrgChange = function(event) {
        const orgId = event.target.value;
        setCurrentOrganization(orgId);
        // fetch departments in this organization
        getDepartment(orgId).then(res => {
            res.json().then(resBody => {
                console.log(resBody);
                if(resBody.code === 200) {
                    // TODO now can select departments
                    const data = resBody.data.filter(dep => {
                        return dep.status !== 'notJoin';
                    });
                    if(data.length === 0) {
                        alert('There is no department you can access in this organization!');
                    }else {
                        setDepartments(data);
                    }
                }else {
                    alert(resBody.msg);
                }
            })
        })
    }

    const handleDepChange = function(event) {
        const depId = event.target.value;
        setCurrentDepartment(depId);
    }

    useEffect(() => {
        // fetch organization
        getOrganization().then(res => {
            res.json().then(resBody => {
                console.log(resBody);
                if(resBody.code == 200) {
                    const data = resBody.data;
                    if(data.length === 0) {
                        alert('You have not joined any organizations!\nJoin an organization first!');
                    }else {
                        setOrganizations(resBody.data);
                    }
                }else {
                    alert(resBody.msg);
                }
            })
        })
    }, [])

    return(
        <Switch>
            <Dialog disableEscapeKeyDown open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{'Choose an organization and department to display contacts'}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5 }}>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel>{"Organization"}</InputLabel>
                            <Select
                            native
                            value={currentOrganiztion}
                            onChange={handleOrgChange}
                            input={<OutlinedInput label={'Organization'}/>}
                            >
                            <option aria-label="None" value={-1} />
                            {organizations.map(item => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>)
                            })}
                            </Select>
                        </FormControl>
                        <FormControl disabled={departments.length <= 0} sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel>{"Department"}</InputLabel>
                            <Select
                            native
                            value={currentDepartment}
                            onChange={handleDepChange}
                            input={<OutlinedInput label={'Department'}/>}
                            >
                            <option aria-label="None" value={-1} />
                            {departments.map(item => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>)
                            })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            <Route exact path={`${path}/:orgId/:depId`}>
                <Contact />
            </Route>
            <Route exact path={`${path}`} >
                Try again
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
            <Route path={`${url}Contacts`}>
                <Contacts/>
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
