import React, { useState } from 'react';

import {
    Dashboard,
    Person as Contact,
    ChatBubble as Event,
    People as Manage,
    Image as ImageIcon,
    MoreHoriz as SettingsIcon,
    ExitToApp as LogOutIcon
} from '@material-ui/icons';


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


function Sidebar(props) {
    const {changePage, selectedPage, currentUser} = props;

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
        <Typography  variant='h3' sx={{color: '#109CF1', textAlign: 'center', py: '2%', fontFamily: 'NTR', fortStyle: 'normal'}}>
            ConnecTI
        </Typography>
    )

    const user = (
        <Grid container>
            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar src={`data:image/gif;base64,${currentUser.photo}`}>
                        <ImageIcon/>
                </Avatar>
            </Grid>
            <Grid container item xs={9} direction='column'>
                <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography >
                        {`${currentUser.first_name} ${currentUser.last_name}`}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography sx={{display: 'flex', justifyContent: 'center', color: 'gray', fontSize: 'small'}}> 
                        {`${currentUser.email}`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    const navList = (
        <div className='sidebar-container'>
            <List>
                {navItems.map((item, index) => (
                    <ListItem onClick={() => changePage(item.name)} button key={item.name} selected={item.name === selectedPage}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const settings = (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="Settings"></ListItemText>
            </ListItem>
        </div>
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
			if (res.ok) {
				alert("Successfully logout");
				document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				history.push("/Login");
			} else {
				console.log("!!!");
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}
		})	
	}

    const logOut = (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                    <LogOutIcon/>
                </ListItemIcon>
                <ListItemText primary="Log out"></ListItemText>
            </ListItem>
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
        </div>
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
            <div className='sidebar-stick-bottom'>
                {settings}
                {logOut}
            </div>
        </Drawer>
    )
}

export default Sidebar