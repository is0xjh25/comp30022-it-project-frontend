import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CreateDep from '../../components/Popup/CreateDep';
import {getDepartment, deleteDepartment, joinDep} from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';

import { useHistory,  useRouteMatch, useParams } from 'react-router-dom';

// CSS style configuration
const useStyles = makeStyles((theme) => ({
    palette: {
        background: {
            default: '#757ce8'
        }
    },

    typography: {
        button: {
            textTransform: 'none'
        },
    },

    topic: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(20),
        display: 'flex',
        justifyContent: 'flex-start',
        component: "h1",
        color: "primary.main",
    },

    manageGrid: {
        alignItems: 'flex-start',
        direction: 'column',
        justifyContent: 'space-around',
        warp: 'nowrap',
        border: 5,
        borderRadius: 5,
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        padding: '30px',
    },
    ownBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        color: theme.palette.success.main,
    },
    memberBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
    },
    plusBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
    },
    transferOwnerButton: {
        position: 'absolute',
        right: 300
    },
    deleteButton: {
        position: 'absolute',
        right: 250,
    }
}));

// if the user owns the department, delete button is diaplayed
function OwnedDepartment(props) {
    const {department, update, showMembers} = props;
    const classes = useStyles();

    //================ Delete Department ==================

    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Delete Confirm';
    const alertMessage = `Do you want to delete ${department.name}?`;
    const handleDeleteDep = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        deleteDepartment(department.id);
        setAlertOpen(false);
        update();
    }

    // link the department to member management page
    return(
        <Grid key={department.id} item alignItems={'center'} xs={8}>
            <Box className={classes.ownBox} bgcolor="success.main">
                <Button onClick={() => showMembers(department.id)} alignItems='center'>
                    {department.name}
                </Button>
                <IconButton onClick={handleDeleteDep} aria-label="delete" className={classes.deleteButton}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
            />
        </Grid>
    )
}

// display all not joined department in the organization, and click to send a join request
function NotJoinedDepartment(props) {
    const {department, update} = props;
    const classes = useStyles();

    //================ Delete Department ==================

    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Join department Confirm';
    const alertMessage = `Do you want to join ${department.name}?`;
    const handleJoinDepartment = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        joinDep(department.id);
        setAlertOpen(false);
        alert('Your request has been sent');
        update();
    }

    return (
        <Grid key={department.id} item xs={8}>
            <Box className={classes.plusBox} bgcolor="text.disabled">
                <Button onClick={handleJoinDepartment}>
                    {department.name}
                </Button>
            </Box>
            <AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
            />
        </Grid>
    )
}

// loop through all department in this organization, and display them according to 
// the user's authority level
export default function Department(props) {
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const history = useHistory();
    let {url} = useRouteMatch();
    let {orgId} = useParams();

    const [updateCount, setUpdateCount] = useState(0);
    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    // request data from backend API
    useEffect(() => {
        const id = orgId;
        getDepartment(id).then(res => {
            if (res.ok) {
                res.json().then(body => {setDepartments(body.data)});
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        }).then(() => {
            setLoading(false);
            if (departments.length === 0) {
                return <div>You have not joined any department yet.</div>
            }
        })
    }, [updateCount])

    const classes = useStyles();

    // display loading page if the request is not finished
    if (loading) {
        return <div>loading...
        </div>
    }

    // diaplay members in the department
    const showMembers = (depId) => {
        history.push(`${url}/${depId}`);
    }

    // diplay departments accordingly
    const own = [];
    const member = [];
    const other = [];
    departments.map((department) => {
        if (department.status==="owner") {
            own.push(
                <OwnedDepartment department={department} update={update} showMembers={showMembers}/>
            )
        } else if(department.status==="member") {
            member.push(
                <Grid key={department.id} item alignItems="center" xs={8}>
                    <Box className={classes.memberBox} bgcolor="info.main">
                        <Button onClick={() => showMembers(department.id)}>
                            {department.name}
                        </Button>
                    </Box>
                </Grid>
            )
        } else {
            other.push(
                <NotJoinedDepartment department={department} update={update}/>
            )
        }
    });

    return (
        <div>
            <Typography className={classes.topic}>
                Joined Departments
            </Typography>

            <Grid className={classes.manageGrid} container spacing={5}>
                {own}
                {member}
            </Grid>

            <Typography className={classes.topic}>
                Not Joined Departments
            </Typography>

            <Grid className={classes.manageGrid} container spacing={5}>
                {other}
                
                <Grid key="createNew" item xs={8}>
                    <Box className={classes.plusBox} bgcolor="text.disabled">
                        <Button>
                            <CreateDep organization_id={orgId} update={update}/>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
