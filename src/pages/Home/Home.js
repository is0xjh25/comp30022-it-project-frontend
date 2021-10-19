import React, { useState, useEffect } from 'react';
import './Home.css';


import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../components/Manage/Organization';
import Department from '../../components/Manage/Department';
import Customer from '../../components/Contact/Customer';
import DisplayCustomer from '../../components/Contact/DisplayCustomer';
import DisplayUser from '../../components/User/DisplayUser';
import { getDepartment, getOrganization } from '../../api/Manage';
import { getUserInfo } from '../../api/Util';
import DisplayEvents from '../../components/Event/DisplayEvents';
import ToDoList from '../../components/ToDoList/ToDoList';
import RecentContact from '../../components/Dashbord/RecentContact'
import RecentActivity from '../../components/Dashbord/RecentActivity';

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
    Grid,
    Divider,
    LinearProgress,
    Box,
} from '@mui/material'



import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useHistory
} from "react-router-dom";



require('dotenv').config();

function Dashboard(props) {
    return(
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh'}}>
            <Box sx={{width: '60%', minWidth:500}}>
                <RecentActivity/>
            </Box>
            <Box sx={{width: '40%', minWidth:500}}>
            <RecentContact />
            </Box>        
        </Box>)
}

function Events(props) {
    return (
        <Grid container sx={{mt:"5%", mb:"5%", minWidth:1200}}>
            <Grid item xs={7} sx={{ width: '100%', px:"3%"}}>
                <DisplayEvents/>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ background: 'purple' }}/>
            <Grid item xs sx={{ width: '100%', px:"3%"}}>
                <ToDoList/>
            </Grid>
        </Grid>
    )
}

function Settings(props) {
    return (

        <DisplayUser/>

    )
}


// The component to render when Manage is selected
function Manage(props) {
  let {path} = useRouteMatch();

  return(
    <Switch>
      <Route exact path={`${path}`}>
        <Organization/>
      </Route>
      <Route exact path={`${path}/:orgId`}>
        <Department currentUser={props.currentUser}/>
      </Route>
      <Route path={`${path}/:orgId/:depId`}>
        <Members/>
      </Route>
    </Switch>
  )
}

// The component to render when Contacts is selected
function Contacts(props) {
    let { path } = useRouteMatch();
    
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [currentOrganization, setCurrentOrganization] = useState(0);
    const [currentDepartment, setCurrentDepartment] = useState(0);
    const history = useHistory();
    const [dialogOpen, setDialogOpen] = useState(false);

    const clearSelected = () => {
        setCurrentDepartment(1);
        setCurrentOrganization(1);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = function() {
        clearSelected();
        setDialogOpen(false);
    }

    const handleDialogConfirm = function() {
        if(currentOrganization < 1 || currentDepartment < 1) {
            alert('Please select an organization and departmnet!');
        }else {
            history.push(`${path}/${currentOrganization}/${currentDepartment}`);
            setDialogOpen(false);
            clearSelected();
        }
    }

    const handleOrgChange = function(event) {
        const orgId = event.target.value;
        setCurrentOrganization(orgId);
        // Fetch departments in this organization
        getDepartment(orgId).then(res => {
            res.json().then(resBody => {
                if(resBody.code === 200) {
                    // TODO now can select departments
                    const data = resBody.data.filter(dep => {
                        return dep.status !== 'notJoin';
                    });
                    if(data.length === 0) {
                        setDepartments(data);
                        alert('There is no department you can access in this organization!');
                    }else {
                        setDepartments(data);
                        setCurrentDepartment(0);
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
        // Fetch organization
        getOrganization().then(res => {
            res.json().then(resBody => {
                if(resBody.code === 200) {
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
        <div>
            <Dialog disableEscapeKeyDown open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{'Choose an organization and department to display contacts'}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5}}>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel>{"Organization"}</InputLabel>
                            <Select
                            native
                            value={currentOrganization}
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
                    <Button onClick={handleDialogConfirm}>Ok</Button>
                </DialogActions>
            </Dialog>
            <Switch>
                <Route path={`${path}/:orgId/:depId/:customerId`} >
                    <DisplayCustomer/>
                </Route>
                <Route path={`${path}/:orgId/:depId`} >
                    <Customer handleDialogOpen={handleDialogOpen}/>
                </Route>
                <Route exact path={`${path}`} >
                    <Box sx={{height: '100vh', width: '100%', minWidth: '600px',flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box>
                            <DialogTitle>{'Choose an organization and department to display contacts'}</DialogTitle>
                            {/* <DialogContent> */}
                                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, maxHeight: 300 }}>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel>{"Organization"}</InputLabel>
                                        <Select
                                        native
                                        value={currentOrganization}
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
                            {/* </DialogContent> */}
                            <DialogActions>
                                <Button onClick={handleDialogClose}>Cancel</Button>
                                <Button onClick={handleDialogConfirm}>Ok</Button>
                            </DialogActions>
                        </Box>

                    </Box>

                </Route>
            </Switch>
        </div>
    )
}


// A home component is rendered when path '/' is matched
function Home(props) {
    const [loading, setLoading] = useState(true);
    let {url} = useRouteMatch();
    const history = useHistory();

    const [selectedPage, setSelectedPage] = useState('');
    const [currentUser, setCurrentUser] = useState({});

    const changePage = function(toPage) {
        setSelectedPage(toPage);
        history.push(`/${toPage}`);
    }



  // Fetch user data, if not logged in, redirect to /Login
  useEffect(() => {
    getUserInfo().then(res => {
        if(res.code === 200) {
            console.log('Currently logged in');
            setCurrentUser(res.data);
            setLoading(false);
        }else {
            history.push('/Login');
        }
    })
  }, [])

    // Display loading page if the request is not finished
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }


  return(
    <Grid container>
        <Grid item xs={2}>
            <Sidebar selectedPage={selectedPage} changePage={changePage} currentUser={currentUser}/>
        </Grid>
        <Grid item xs={10}>
            <Switch>
                
                <Route exact path={`${url}`}>
                    <Redirect to={`${url}Dashboard`}/>
                </Route>

                <Route path={`${url}Dashboard`}>
                    <Dashboard/>
                </Route>

                <Route path={`${url}Contacts`}>
                    <Contacts/>
                </Route>

                <Route path={`${url}Events`}>
                    <Events/>
                </Route>

                <Route path={`${url}Manage`}>
                    <Manage currentUser={currentUser}/>
                </Route>

                <Route path={`${url}Settings`}>
                    <Settings/>
                </Route>

                <Route path={`${url}TestContact/:orgId/:depId`}>
                    <Customer/>
                </Route>

            </Switch>
        </Grid>

    </Grid>
  )
}

export default Home;
