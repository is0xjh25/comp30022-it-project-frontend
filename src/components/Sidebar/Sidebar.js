import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Dashboard from '@material-ui/icons/Dashboard';
import Contact from '@material-ui/icons/Person';
import Event from '@material-ui/icons/ChatBubble';
import Manage from '@material-ui/icons/People';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/MoreHoriz'
import LogOutIcon from '@material-ui/icons/ExitToApp';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Logout from '../Popup/Logout';


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

function MyDrawer() {
    const classes = useStyles();
    return <Drawer className={classes.drawer} varian='permanent'></Drawer>
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems: [
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
        }
        
    }

    

    render() {

        const title = (
            <div className='sidebar-title'>
                ConnecTI
            </div>
        )

        const user = (
            <div className='sidebar-user'>
                <div className='sidebar-user-avatar-container'>
                    <div className='sidebar-user-avatar'>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </div>
                    <div className='sidebar-user-text'>
                        Edit Profile
                    </div>
                </div>
                <div className='sidebar-user-main'>
                    <div className='sidebar-user-name'>
                        Sierra Ferguson
                    </div>
                    <div className='sidebar-user-email'>
                        s.ferguson@gmail.com
                    </div>
                </div>
            </div>
        )

        const navList = (
            <div className='sidebar-container'>
                <List>
                    {this.state.navItems.map((item, index) => (
                        <ListItem onClick={() => this.props.changePage(item.name)} button key={item.name} selected={item.name == this.props.selectedPage}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        )

        // const divider = (
        //     <div>
        //         <Divider className={classes.root}/>
        //     </div>
        // )

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

        const logOut = (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <LogOutIcon/>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log out"></ListItemText>
                </ListItem>
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
}

export default Sidebar