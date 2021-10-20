import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory,  useRouteMatch, useParams } from 'react-router-dom';
// MUI import
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {
    Button,
    IconButton,
    Typography,
    Box,
    LinearProgress,
    Badge
    
} from '@mui/material'
// Local import
import {
    getDepartment, 
    deleteDepartment, 
    joinDep, 
    getOrgDetail,
    deleteUser,
    getIfUserHasPendingRequestBasedOnDepartmentId
} from '../../api/Manage';
import { getUserInfo } from '../../api/Util';
import AlertDialog from '../Dialog/AlertDialog';
import CreateDep from '../../components/Popup/CreateDep';
import { useSnackbar } from 'notistack';

function HasPendingNotation(props) {
    const {hasPending} = props;
    if (hasPending === true) {
        return (            
        <Badge color="secondary" badgeContent=" " sx={{
                position: 'absolute',
                right: '-1px',
                top: '-1px'
        }}>
        </Badge>
        )
    }
    return null;
}


// If the user owns the department, delete button is displayed
function OwnedDepartment(props) {
    const {department, update, showMembers} = props;
    const [hasPending, setHasPending] = useState(false);

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

    getIfUserHasPendingRequestBasedOnDepartmentId(department.organization_id, department.id).then(res => {
        if(res.code === 200 && res.msg === "Have pending") {
            setHasPending(true);
        }
    })

    // Link the department to member management page
    return(
        <Box key={department.id}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'success.light',
                    my: '40px',
                    position: 'relative'
                }} 
            >
                <HasPendingNotation hasPending={hasPending}/>
                <Button onClick={() => showMembers(department.id)} fullWidth>
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
        </Box>
    )
}

// If the user is a member of the department, delete button is used to leave the department
function MemberDepartment(props) {
    const {department, update, showMembers} = props;
    const [userId, setUserId] = useState("");

    //================ Leave Department ==================
    // Get current user's id
    const getUserId = () => {
        getUserInfo().then(res => {
            if (res.code === 200) {
                setUserId(res.data.id)
            }
        })
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Leave Department Confirm';
    const alertMessage = `Do you want to leave ${department.name}?`;
    const handleLeaveDep = function() {
        getUserId();
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        deleteUser(userId, department.id);
        setAlertOpen(false);
        update();
    }

    // Link the department to member management page
    return(
        <Box key={department.id}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'info.main',
                    my: '40px',
                    position: 'relative'
                }} 
            >
                <Button onClick={() => showMembers(department.id)} fullWidth>
                    <Typography sx={{ pl: '60px'}} color="text.primary">
                        {department.name}
                    </Typography> 
                </Button>
                
                <IconButton onClick={handleLeaveDep} aria-label="delete" sx={{height: 60, width: 60}} >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Box>
            <AlertDialog alertTitle={alertTitle}
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
                handleConfirm={handleAlertConfirm}
                handleCancel={() => { setAlertOpen(false) }}
            />
        </Box>
    )
}

// Display all not joined department in the organization, and click to send a join request
function NotJoinedDepartment(props) {
    
    const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar('Your request has been sent!',{variant: 'info'});
        update();
    }

    return (
        <Box key={department.id}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'text.disabled',
                    my: '40px'
                }} 
            >
                <Button onClick={handleJoinDepartment} fullWidth>
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
        </Box>
    )
}

// Loop through all department in this organization, and display them according to 
// the user's authority level
export default function Department(props) {
    
    const { enqueueSnackbar } = useSnackbar();
    const {currentUser} = props;
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const history = useHistory();
    let {url} = useRouteMatch();
    let {orgId} = useParams();

    const [owned, setOwned] = useState(false);

    const [updateCount, setUpdateCount] = useState(0);
    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    // Request data from backend API
    useEffect(() => {
        const id = orgId;
        getDepartment(id).then(res => {
            if (res.code===200) {
                setDepartments(res.data);
            } else {
                enqueueSnackbar(res.msg,{variant: 'error'});
            }
        }).then(() => {
            setLoading(false);
            if (departments.length === 0) {
                return <div>You have not joined any department yet.</div>
            }
        })

        getOrgDetail(orgId).then(res => {
            if(res.code == 200) {
                setOwned(res.data.owner === currentUser.id);
            }
        })


    }, [updateCount])

    // Display loading page if the request is not finished
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    // Diaplay members in the department
    const showMembers = (depId) => {
        history.push(`${url}/${depId}`);
    }

    // Display departments accordingly
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
                <MemberDepartment department={department} update={update} showMembers={showMembers}/>
            )
        } else {
            other.push(
                <NotJoinedDepartment department={department} update={update}/>
            )
        }
    });

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '45px'}}>
            <Typography variant="h6" sx={{alignSelf: 'flex-start', ml: '45px'}}>
                Joined Departments
            </Typography>
            <Box sx={{width: '75%', mb: '60px'}}>
                <Box container rowSpacing={5}>
                    {own}
                    {member}
                </Box>
            </Box>

            
            <Typography variant="h6" sx={{alignSelf: 'flex-start', ml: '45px'}}>
                Not Joined Departments
            </Typography>
            <Box sx={{width: '75%'}}>
                <Box container rowSpacing={5}>
                    {other}
                    {owned && 
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            borderRadius: 2,
                            boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                            bgcolor: 'text.disabled',
                            my: '40px'

                        }} 
                    >
                        <CreateDep organization_id={orgId} update={update}/>
                    </Box>}
                    
                </Box>
            </Box>

        </Box>
    )
}
