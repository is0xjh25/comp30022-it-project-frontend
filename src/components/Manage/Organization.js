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
        // border: 10,
        // alignItems: 'space-around',
        justifyContent: 'flex-start',
        component: "h1",
        color: "primary.main",
    },

    // 一个box的class，规定box css
    // 三个不同颜色的css
    orgGrid: {
        alignItems: 'flex-start',
        direction: 'column',
        justifyContent: 'space-around',
        warp: 'nowrap',
        // color: 'rgb(255, 255, 0)',
        border: 5,
        borderRadius: 5,
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '30px',
    },
    ownBox: {
        // marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // m: 1,
        // borderColor: 'text.primary',
        // alignItems: 'center',
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
        // alignSelf: strentch,
        // color: theme.palette.info.main,
    },
    plusBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // alignItems: 'center',
        // color: theme.palette.success.main,
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

function EachOrganization(props) {
    const {org, update} = props;
    const classes = useStyles();
    const history = useHistory();
    let {path, url} = useRouteMatch();
    const showDepartment = (id) => {
        history.push(`${url}/${id}`)

    };

    //================ Delete Organization ==================

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

export default function Organization(props) {
    // read in the user's organisation info from backend api
    const [loading, setLoading] = useState(true);
    const [organizations, setOrganizations] = useState([]);

    const [updateCount, setUpdateCount] = useState(0);


    useEffect(() => {
        getOrganization().then(res => {
            if (res.ok) {
                res.json().then(body => {
                    console.log(body);
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
