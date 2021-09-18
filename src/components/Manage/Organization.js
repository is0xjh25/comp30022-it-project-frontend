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
import {getOrganization} from '../../api/Manage';

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

export default function Organization(props) {
    // read in the user's organisation info from backend api
    const [loading, setLoading] = useState(true);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        getOrganization().then(res => {
            if (res.ok) {
                res.json().then(body => {setOrganizations(body.data)});
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        }).then(() => {
            setLoading(false);
            if (organizations.length === 0) {
                return <div>You have not joined any organization yet.</div>
            }
        })
    }, [])


    const classes = useStyles();
 
    if (loading) {
        return <div>loading...</div>
    }



    const showDepartment = (id) => {
        // login ? 
        console.log(organizations)
        console.log(id)
        console.log("*********")
        props.changePage('Department');
        props.changeOrg(id);
        // return <Department></Department> 
        // : <Typography>Not logged in QAQ</Typography>
    };
    
    const orgs = 
        organizations.map((org) => {
            console.log(org.id)
            return(
                org.ownership === "own" ? 
                    <Grid item alignItems={'center'} xs={8}>
                        <Box className={classes.ownBox} bgcolor="success.main">
                            <Button alignItems='center' value={org.id} onClick={() => showDepartment(org.id)}>
                                {org.name}
                            </Button>

                            <IconButton aria-label="personOutlined" className={classes.transferOwnerButton}>
                                <PersonOutlineOutlinedIcon />
                            </IconButton>
                            
                            <IconButton aria-label="delete" className={classes.deleteButton}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                :
                    <Grid item alignItems="center" xs={8}>
                        <Box className={classes.memberBox} bgcolor="info.main">
                            <Button onClick={() => showDepartment(org.organization_id)}>
                                {org.name}
                            </Button>
                        </Box>
                    </Grid>
            )
            
        });

    return (
        <div>
            <Typography className={classes.topic}>
                My Orgnizations
            </Typography>
            <Grid className={classes.orgGrid} container spacing={5}>
                {orgs}
                <Grid item xs={8}>
                    <Box className={classes.plusBox} bgcolor="text.disabled">
                        <Button>
                        <CreateOrg /> + <JoinOrg />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
