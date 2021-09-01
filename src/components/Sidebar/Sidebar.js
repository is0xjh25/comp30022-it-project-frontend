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


import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Dashboard",
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
        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(nowSelected) {
        this.setState({
            selected: nowSelected
        })
    }

    render() {
        const title = (
            <div className='sidebar-title'>
                ConnecTI
            </div>
        )

        const user = (
            <div className='sidebar-user'>
                <div className='sidebar-user-avatar'>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </div>
                <div>
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
                        <ListItem onClick={() => this.changeSelected(item.name)} button key={item.name} selected={item.name == this.state.selected}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        )

        const divider = (
            <div>
                <Divider className='divider'/>
            </div>
        )

        const recentContacts = (
            <div>
                <List>
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

                </List>
            </div>
        )


        return(
            <div>
                <Drawer variant='permanent'>
                    {title}
                    {user}
                    {navList}
                    {divider}
                    {recentContacts}
                </Drawer>

            </div>
        )
    }
}

export default Sidebar