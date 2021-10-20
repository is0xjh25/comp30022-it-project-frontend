import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
    Dashboard,
    Person as Contact,
    ChatBubble as Event,
    People as Manage,
    Image as ImageIcon,
    MoreHoriz as SettingsIcon,
    ExitToApp as LogOutIcon
} from '@material-ui/icons';
import Badge from '@mui/material/Badge';

import {
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Grid
} from '@mui/material';


import { logout } from '../../api/Login';
import { useHistory } from 'react-router';
import {processPhoto} from '../../api/Photo';
import {getIfUserHasPendingRequest} from '../../api/Manage';


export default function Sidebar(props) {

    const { enqueueSnackbar } = useSnackbar();
    const {changePage, selectedPage, currentUser} = props;
    const [hasPending, setHasPending] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);

    const refreshPage = () => {
        setUpdateCount(updateCount + 1);
    }

    const navItems = [
        {
            icon: <Dashboard />,
            name: "Dashboard",
        },
        {
            icon: <Contact />,
            name: "Contacts"
        },
        {
            icon: <Event />,
            name: "Events"
        },
        {
            icon: <Manage />,
            name: "Manage"
        },
    ]

    const title = (
        <Grid sx={{fontSize: '50px',color: '#109CF1', textAlign: 'center', py: '2%', fontFamily: 'NTR', fortStyle: 'normal'}}>
            ConnecTI
        </Grid>
    )

    useEffect(() => {
        getIfUserHasPendingRequest().then(res => {
            if(res.code===200) {
                if(res.msg==="Have pending") {
                    setHasPending(true);
                }else if(res.msg==="No pending") {
                    setHasPending(false);
                }
                
            }
        })

        setTimeout(() => {
            refreshPage();
            console.log(updateCount);
        }, 10000);

    }, [updateCount])
    
    const user = (
        <Grid container sx={{my: '10px'}}>
            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar src={processPhoto(currentUser.photo)}>
                        <ImageIcon/>
                </Avatar>
            </Grid>
            <Grid container item xs={9} direction='column'>
                <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography >
                        {`${currentUser.first_name} ${currentUser.last_name}`}
                    </Typography>
                </Grid>
                <Grid sx={{display: 'flex', justifyContent: 'center', color: 'gray', fontSize: 'small'}}>
                    {/* <Typography sx={{display: 'flex', justifyContent: 'center', color: 'gray', fontSize: 'small'}}>  */}
                        {`${currentUser.email}`}
                    {/* </Typography> */}
                </Grid>
            </Grid>
        </Grid>
    )



    const navList = (
            <List>
                <Grid container>
                {navItems.map((item, index) => {
                    if (item.name === "Manage" && hasPending) {
                        return (
                            <ListItem onClick={() => changePage(item.name)} button key={item.name} selected={item.name === selectedPage}>
                                <Grid item container>
                                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                                        <ListItemIcon>
                                            <Badge variant="dot" color="secondary">
                                                {item.icon}
                                            </Badge>
                                        </ListItemIcon>
                                    </Grid>
                                    <Grid item xs={9} sx={{display: 'flex', justifyContent: 'center'}}>
                                        <ListItemText primary={item.name}></ListItemText>
                                    </Grid> 
                                </Grid>  
                            </ListItem>
                        )
                    }
                    else {
                        return (
                            <ListItem onClick={() => changePage(item.name)} button key={item.name} selected={item.name === selectedPage}>
                                <Grid item container>
                                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                    </Grid>
                                    <Grid item xs={9} sx={{display: 'flex', justifyContent: 'center'}}>
                                        <ListItemText primary={item.name}></ListItemText>
                                    </Grid> 
                                </Grid>  
                            </ListItem>
                        )
                    }        
                })}
                </Grid>
            </List>
    )

    const settings = (

        <ListItem button onClick={()=>changePage("Settings")}>
            <Grid item container>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                </Grid>
                <Grid item xs={9} sx={{display: 'flex', justifyContent: 'center'}}>

                <ListItemText primary="Profile"></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )

    const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);
	const history = useHistory();

	const handleClickOpen = () => {
        setLogoutAlertOpen(true);
	};

	const handleClickClose = () => {
		setLogoutAlertOpen(false);
	};
	
	// Logout
  	const handleConfirm = () => {
		logout().then(res => {
			if (res.code===200) {
				enqueueSnackbar("Logout successfully",{variant:'success'});
				document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				history.push("/Login");
			} else {
				enqueueSnackbar(res.msg,{variant:"error"});
			}
		})	
	}

    const logOut = (
        
        <ListItem button onClick={handleClickOpen}>
            <Grid item container>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <ListItemIcon>
                        <LogOutIcon/>
                    </ListItemIcon>
                </Grid>
                <Grid item xs={9} sx={{display: 'flex', justifyContent: 'center'}}>
                    <ListItemText primary="Log out"></ListItemText>
                </Grid>
            </Grid>  
        </ListItem>
    )

    return(
        <Drawer 
        variant='permanent'

        sx={{
            width: '100%',
            '& .MuiDrawer-paper' : {
                width: '16.7%', // 16.7% = 2/12
                maxWidth: '16.7%'
            }
        }}>
            {title}
            {user}
            {navList}
            <Divider />
            <List sx={{position: 'absolute', bottom: '10px', width: '100%'}}>
                <Grid container>
                    {settings}
                    {logOut}
                </Grid>
            </List>
            <Dialog open={logoutAlertOpen} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">See you next time</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Do you really want to leave?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClickClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </Drawer>
    )
}