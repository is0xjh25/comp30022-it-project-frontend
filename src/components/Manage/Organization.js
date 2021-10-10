import React from 'react';
import { useState, useEffect } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

// import { makeStyles } from '@material-ui/core/styles';
import CreateOrg from '../../components/Popup/CreateOrg';
import JoinOrg from '../../components/Popup/JoinOrg';
import AlertDialog from '../Dialog/AlertDialog';

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

import {
    makeStyles
} from '@mui/styles';


import {getOrganization, deleteOrganization, searchMemberInOrg} from '../../api/Manage';

// CSS style configuration
const useStyles = makeStyles({
    // palette: {
    //     background: {
    //         default: '#757ce8'
    //     }
    // },

    // typography: {
    //     button: {
    //         textTransform: 'none'
    //     },
    // },

    topic: {
        // marginTop: theme.spacing(5),
        // marginLeft: theme.spacing(20),
        // display: 'flex',
        // justifyContent: 'flex-start',
        
        color: "primary.main",
    },

    orgGrid: {
        direction: 'column',
        justifyContent: 'space-around',
        wrap: 'nowrap',
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        padding: '30px',
    },
    ownBox: {
        display: 'flex',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // color: theme.palette.success.main,
    },
    memberBox: {
        display: 'flex',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
    },
    plusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
    },
    transferOwnerButton: {
        position: 'relative',
        width: 60,
        height: 60,
    },
    deleteButton: {
        position: 'relative',
        width: 60,
        height: 60,
    }
});

// loop through all organizations of this user,
// and display them according to the user's ownership
function EachOrganization(props) {
    const {org, update} = props;
    const classes = useStyles();

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
                <Box className={classes.memberBox} bgcolor="info.main">
                    <Button onClick={() => showDepartment(org.id)}>
                        {org.name}
                    </Button>
                </Box>
            </Grid>
    )


}

function OwnedOrganization(props) {
    const {org, update, showDepartment} = props;
    const classes = useStyles();

    //================ Delete Organization ==================
    // if the user owns the organization, delete button is displayed
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
            <Box sx={{display:"flex"}}>
            <Button onClick={() => showDepartment(org.id)} className={classes.ownBox} sx={{color: "black"}} fullWidth variant="contained">
                    {org.name}

            </Button>
                <IconButton aria-label="personOutlined" onClick={handleTransfer} className={classes.transferOwnerButton}>
                    <PersonOutlineOutlinedIcon />
                </IconButton>
                
                <IconButton onClick={handleDeleteOrg} aria-label="delete" className={classes.deleteButton}>
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
                    {/* {button} */}
                </DialogActions>
            </Dialog>



        </Grid>
    )

}

// the organization component, it displays the user's current joined organizations,
// and offer buttons for create/join new organizations
export default function Organization(props) {
    const [loading, setLoading] = useState(true);
    const [organizations, setOrganizations] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);

    // request data from backend API everytime updates
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

    const classes = useStyles();

    // display loading page if the request is not finished
    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Typography variant="h6" className={classes.topic}>
                My Orgnizations
            </Typography>

            <Grid className={classes.orgGrid} container rowSpacing={5}>
                {organizations.map((org) => {
                    return (<EachOrganization key={org.id} org={org} update={update}/>)
                })}

                <Grid item xs={8}>
                    <Box className={classes.plusBox} bgcolor="text.disabled" sx={{display:'flex', flexDirection: 'row'}}>
                        <CreateOrg update={update} /> + <JoinOrg update={update}/>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
