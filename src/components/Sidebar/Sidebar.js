import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Dashboard from '@material-ui/icons/Dashboard';
import Contact from '@material-ui/icons/Person';
import Event from '@material-ui/icons/ChatBubble';
import Manage from '@material-ui/icons/People';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/MoreHoriz'
import LogOutIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { logout } from '../../api/Login';
import { useHistory } from 'react-router';



import './Sidebar.css';

require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    divider: {
        background: '#109CF1'
    },

}))

function MyDivider() {
    const classes = useStyles();
    return <Divider className={classes.divider} variant='middle'></Divider>
}

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
        <div className='sidebar-title'>
            ConnecTI
        </div>
    )

    const user = (
        <div className='sidebar-user'>
            <div className='sidebar-user-avatar-container'>
                <div className='sidebar-user-avatar'>
                    <Avatar src={`data:image/gif;base64,${currentUser.photo}`}>
                        <ImageIcon/>
                    </Avatar>
                </div>
                <div className='sidebar-user-text'>
                    Edit Profile
                </div>
            </div>
            <div className='sidebar-user-main'>
                <div className='sidebar-user-name'>
                    {`${currentUser.first_name} ${currentUser.last_name}`}
                </div>
                <div className='sidebar-user-email'>
                    {`${currentUser.email}`}
                </div>
            </div>
        </div>
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

    const recentContacts = (
        <div>
            {/* <List>
                {[1,2,3,4,5].map(item => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Mrs." secondary="Andy Liu" />
                </ListItem>
                ))}

            </List> */}
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
        <div>
            <Drawer variant='permanent'>
                {title}
                {user}
                {navList}
                <MyDivider />
                {recentContacts}
                <div className='sidebar-stick-bottom'>
                    {settings}
                    {logOut}
                </div>
            </Drawer>
            {process.env.BASE_URL}
        </div>
    )
}

export default Sidebar