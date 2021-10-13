import React from 'react';
import { useState, useEffect } from 'react';
import { 
    useHistory,  
    useRouteMatch 
} from 'react-router-dom';

// MUI import
import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
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
    Avatar
    
} from '@mui/material'

// Local import
import {getOrganization, deleteOrganization, searchMemberInOrg, transferOwnership} from '../../api/Manage';
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
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 60,
                        borderRadius: 2,
                        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                        bgcolor: 'info.main',
                        my: '40px'
                    }} 
                >
                    <Button onClick={() => showDepartment(org.id)}>
                        <Typography color="text.primary">{org.name}</Typography>
                    </Button>
                </Box>
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
    const [selectedMember, setSelectedMember] = useState(null);
    const [confirm, setConfirm] = useState(false);


    const handleTransfer = function() {
        setTransferOpen(true);
    }
    
    const handleTransferCancel = function() {
        setTransferOpen(false);
        setSelectedMember(null);
        setMembers([]);
        setConfirm(false);
    }

    const handleOnChange = function(event) {
        setSelectedMember(null);
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

    const handleSubmitTransfer = () => {
        console.log(selectedMember);
        transferOwnership(org.id, selectedMember.user_id).then(res => {
            console.log(res);
            if (res.code === 200) {
                alert("Successfully transfered the owner!");
                }else {
                alert(res.msg);
            }
        })
        update();
    }
    
    const handleClickTransfer = () => {
        setConfirm(true);
    }
    
    return (
        <Box key={org.id}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 2,
                    boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
                    bgcolor: 'success.light',
                    my: '40px'
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

                {confirm ? 
                <Box>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to transfer the owner of the organization to this member?
                        </DialogContentText>
                        <Box sx={{mt: 4, display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                            <Grid container direction='column' sx={{ml: 3}}>
                                <Grid item sx={{height: '50px', display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="h5" sx={{fontWeight: 'bold', mr: 3}}>Name</Typography>
                                    <Typography variant="h5">{selectedMember.first_name + ' ' + selectedMember.last_name}</Typography>
                                </Grid>
                                <Grid item sx={{height: '50px', display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="h5" sx={{fontWeight: 'bold', mr: 3}}>Email</Typography>
                                    <Typography variant="h6">{selectedMember.email}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setConfirm(false)}} color="primary">
                            Back
                        </Button>
                        <Button disabled={selectedMember===null} onClick={handleSubmitTransfer} >
                            Transfer
                        </Button>
                    </DialogActions>
                </Box> :                 
                <Box>
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
                                return (<ToggleButton key={member.user_id} value={member} aria-label={member.name}>
                                    {member.name}
                                </ToggleButton>)

                            })}
                        </ToggleButtonGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleTransferCancel} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={selectedMember===null} onClick={handleClickTransfer} >
                            Transfer
                        </Button>
                    </DialogActions>
                </Box>}
            </Dialog>

        </Box>
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
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '45px'}}>
            <Typography variant="h6" sx={{alignSelf: 'flex-start', ml: '45px'}}>
                My Orgnizations
            </Typography>
            <Box sx={{width: '75%'}}>
                <Box 
                sx={{
                    diplay: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 1,
                    // alignSelf: 'center',
                    textAlign: 'center',
                    alignItems: 'center'
                }} 
                container 
                rowSpacing={5}
                >
                    {organizations.map((org) => {
                        return (<EachOrganization key={org.id} org={org} update={update}/>)
                    })}

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
                        <CreateOrg update={update} /> + <JoinOrg update={update}/>
                    </Box>

                </Box>
            </Box>
        </Box>
        
    )
}
