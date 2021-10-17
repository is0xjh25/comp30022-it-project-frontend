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
    Avatar,
    LinearProgress,
    Badge
    
} from '@mui/material'
import {styled} from '@mui/system';
import BadgeUnstyled from '@mui/core/BadgeUnstyled';
import {getIfUserHasPaddingRequestBasedOnOrgId} from '../../api/Manage';

// Local import
import {getOrganization, deleteOrganization, searchMemberInOrg, transferOwnership} from '../../api/Manage';
import CreateOrg from '../../components/Popup/CreateOrg';
import JoinOrg from '../../components/Popup/JoinOrg';
import AlertDialog from '../Dialog/AlertDialog';


const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRightCircular {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

// Loop through all organizations of this user,
// and display them according to the user's ownership
function EachOrganization(props) {
    const {org, update} = props;
    const [hasPending, setHasPending] = useState(false);

    const history = useHistory();
    let {url} = useRouteMatch();
    const showDepartment = (id) => {
        history.push(`${url}/${id}`)

    };

    getIfUserHasPaddingRequestBasedOnOrgId(org.id).then(res => {
        if(res.code == 200 && res.msg === "Have pending") {
            setHasPending(true);
        }
    })

    return(
        org.owner === true ? 
            <OwnedOrganization org={org} update={update} showDepartment={showDepartment} hasPending={hasPending}/>
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

function HasPendingNotation(props) {
    const {hasPending} = props;
    console.log(hasPending)
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

function OwnedOrganization(props) {
    const {org, update, showDepartment, hasPending} = props;
    console.log(hasPending)
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
        // <Badge variant="dot" color="secondary">
        <Box key={org.id}>
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
                <Button onClick={() => showDepartment(org.id)} fullWidth>
                    <Typography sx={{ pl: '120px'}} color="text.primary">
                        {org.name}
                    </Typography> 
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
        // </Badge>
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
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
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
                        <CreateOrg update={update}/>or<JoinOrg update={update}/>
                    </Box>

                </Box>
            </Box>
        </Box>
        
    )
}
