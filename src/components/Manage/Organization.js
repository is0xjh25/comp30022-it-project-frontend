import React from 'react';
import { useState, useEffect } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import { 
    useHistory,  
    useRouteMatch 
} from 'react-router-dom';

import {
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    ToggleButtonGroup,
    ToggleButton,
    Grid,
    Typography,
    Box,
    
} from '@mui/material'

import {getOrganization, deleteOrganization, searchMemberInOrg} from '../../api/Manage';
import CreateOrg from '../../components/Popup/CreateOrg';
import JoinOrg from '../../components/Popup/JoinOrg';
import AlertDialog from '../Dialog/AlertDialog';

// Loop through all organizations of this user,
// and display them according to the user's ownership
function EachOrganization(props) {
    const {org, update} = props;

    const history = useHistory();
    let {url} = useRouteMatch();
    const showDepartment = (id) => {
        history.push(`${url}/${id}`)

    };

    return(
        org.owner === true ? 
            <OwnedOrganization org={org} update={update} showDepartment={showDepartment}/>
        :
            <Grid key={org.id} item xs={8}>
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
                    <Button onClick={() => showDepartment(org.id)}>
                        <Typography color="text.primary">{org.name}</Typography>
                    </Button>
                </Box>
            </Grid>
    )


}

function OwnedOrganization(props) {
    const {org, update, showDepartment} = props;

    //================ Delete Organization ==================
    // If the user owns the organization, delete button is displayed
    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Delete Confirm';
    const alertMessage = `Do you want to delete ${org.name}?`;
    const handleDeleteOrg = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        deleteOrganization(org.id);
        setAlertOpen(false);
        update();
    }

    //================ Transfer Organization Ownership==================
    const [transferOpen, setTransferOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(undefined);


    const handleTransfer = function() {
        setTransferOpen(true);
    }
    
    const handleTransferCancel = function() {
        console.log("Cancelled");
        setTransferOpen(false);
        setSelectedMember(undefined);
        setMembers([]);
    }

    const handleOnChange = function(event) {
        console.log(event.target.value);
        searchMemberInOrg(org.id, event.target.value).then(res => {
            if (res.code === 200) {
                const data = res.data
                const records = data.records
                records.forEach(row => {
                    row.name = row.first_name + ' ' + row.last_name
                });
                setMembers(records);
                }else {
                alert(res.msg);
            }
        })
    }

    const handleSelecteMember = (event, e) => {
		setSelectedMember(e);
	}
    
    return (
        <Grid key={org.id} item xs={8}>
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
                <Button onClick={() => showDepartment(org.id)} fullWidth >
                    <Typography sx={{ pl: '120px'}} color="text.primary">{org.name}</Typography>
                </Button>

                <IconButton aria-label="personOutlined" onClick={handleTransfer} sx={{height: 60, width: 60}} >
                    <PersonOutlineOutlinedIcon />
                </IconButton>
                
                <IconButton aria-label="delete" onClick={handleDeleteOrg} sx={{height: 60, width: 60}} >
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

            <Dialog open={transferOpen} onClose={handleTransferCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Transfer Ownership</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Start typing the name of the member.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="organization"
                        label="search"
                        type="organization"
                        fullWidth
                        onChange={handleOnChange}
                        // error={!available && !firstTry ? true : false}
                        // helperText={available || firstTry ? "Ready to join" : "organization does not exist"}
                    />
                    <ToggleButtonGroup orientation="vertical" value={selectedMember} exclusive onChange={handleSelecteMember} sx={{display:"flex", justifyContent: 'center'}}>
                        {members.map( (member) => {
                            return (<ToggleButton key={member.user_id} value={member.user_id} aria-label={member.name}>
                                {member.name}
                            </ToggleButton>)

                        })}
                    </ToggleButtonGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferCancel} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={selectedMember===undefined} >
                        Transfer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}

// The organization component, it displays the user's current joined organizations,
// and offer buttons for create/join new organizations
export default function Organization(props) {
    const [loading, setLoading] = useState(true);
    const [organizations, setOrganizations] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);

    // Request data from backend API everytime updates
    useEffect(() => {
        getOrganization().then(res => {
            if (res.ok) {
                res.json().then(body => {
                    setOrganizations(body.data)
                });
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        }).then(() => {
            setLoading(false);
            if (organizations.length === 0) {
                return <div>You have not joined any organization yet.</div>
            }
        })
    }, [updateCount])

    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    // Display loading page if the request is not finished
    if (loading) {
        return <div>loading...</div>
    }

    return (
        <Grid>
            <Typography variant="h6">
                My Orgnizations
            </Typography>

            <Grid 
                sx={{
                    diplay: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 1,
                    alignSelf: 'center',
                }} 
                container 
                rowSpacing={5}
            >
                {organizations.map((org) => {
                    return (<EachOrganization key={org.id} org={org} update={update}/>)
                })}

                <Grid item xs={8}>
                    <Box
                        sx={{
                            diplay: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            height: 60,
                            borderRadius: 2,
                            boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                            bgcolor: 'text.disabled',

                        }} >
                        <CreateOrg update={update} /> + <JoinOrg update={update}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}
