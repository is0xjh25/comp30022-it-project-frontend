import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CreateOrg from '../../components/Popup/CreateOrg';
import JoinOrg from '../../components/Popup/JoinOrg';
import {getOrganization, deleteOrganization} from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';

import { useHistory,  useRouteMatch } from 'react-router-dom';

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

    orgGrid: {
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

    return(
        org.owner === true ? 
            <Grid key={org.id} item alignItems={'center'} xs={8}>
                <Box className={classes.ownBox} bgcolor="success.main">
                    <Button alignItems='center' onClick={() => showDepartment(org.id)}>
                        {org.name}
                    </Button>

                    <IconButton aria-label="personOutlined" className={classes.transferOwnerButton}>
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
            </Grid>
        :
            <Grid key={org.id} item alignItems="center" xs={8}>
                <Box className={classes.memberBox} bgcolor="info.main">
                    <Button onClick={() => showDepartment(org.id)}>
                        {org.name}
                    </Button>
                </Box>
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
            <Typography className={classes.topic}>
                My Orgnizations
            </Typography>

            <Grid className={classes.orgGrid} container spacing={5}>
                {organizations.map((org) => {
                    return (<EachOrganization key={org.id} org={org} update={update}/>)
                })}

                <Grid item xs={8}>
                    <Box className={classes.plusBox} bgcolor="text.disabled">
                        <Button>
                            <CreateOrg update={update} /> + <JoinOrg update={update}/>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
