import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory,  useRouteMatch, useParams } from 'react-router-dom';

// MUI import
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Button,
    IconButton,
    Grid,
    Typography,
    Box,
    
} from '@mui/material'

// Local import
import {getDepartment, deleteDepartment, joinDep} from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';
import CreateDep from '../../components/Popup/CreateDep';

// If the user owns the department, delete button is diaplayed
function OwnedDepartment(props) {
    const {department, update, showMembers} = props;

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

    // Link the department to member management page
    return(
        <Grid key={department.id} item xs={8}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'success.light'
                }} 
            >
                <Button onClick={() => showMembers(department.id)} alignItems='center'>
                    <Typography sx={{ pl: '60px'}} color="text.primary">{department.name}</Typography>
                </Button>
                <IconButton onClick={handleDeleteDep} aria-label="delete" sx={{height: 60, width: 60}} >
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

// Display all not joined department in the organization, and click to send a join request
function NotJoinedDepartment(props) {
    const {department, update} = props;

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
            <Box
                sx={{
                    diplay: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'text.disabled',

                }} 
            >
                <Button onClick={handleJoinDepartment}>
                    <Typography color="text.primary">{department.name}</Typography>
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

// Loop through all department in this organization, and display them according to 
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

    // Request data from backend API
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

    // Display loading page if the request is not finished
    if (loading) {
        return <div>loading...
        </div>
    }

    // Diaplay members in the department
    const showMembers = (depId) => {
        history.push(`${url}/${depId}`);
    }

    // Diplay departments accordingly
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
                <Grid key={department.id} item xs={8}>
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: 60,
                            borderRadius: 2,
                            boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                            bgcolor: 'info.main'
                        }} 
                    >
                        <Button onClick={() => showMembers(department.id)}>
                            <Typography color="text.primary">{department.name}</Typography>
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
            <Typography variant="h6">
                Joined Departments
            </Typography>

            <Grid
                sx={{
                    diplay: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 1,
                }} 
                container 
                rowSpacing={5}
            >
                {own}
                {member}
            </Grid>

            <Typography variant="h6">
                Not Joined Departments
            </Typography>

            <Grid
                sx={{
                    diplay: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 1,
                }} 
                container 
                rowSpacing={5}
            >
                {other}
                
                <Grid key="createNew" item xs={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            borderRadius: 2,
                            boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                            bgcolor: 'text.disabled',

                        }} 
                    >
                        <Button>
                            <CreateDep organization_id={orgId} update={update}/>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
