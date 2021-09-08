import React from 'react';

import SearchBar from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';



import SearchIcon from '@material-ui/icons/Search';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Table from './Table';


import './Members.css'


const mockData = [
    {
        name: "Member1",
        email: "something@email.com",
        permissionLevel: 5,
        recentActivity: "Today",

    },
    {
        name: "Member1",
        email: "something@email.com",
        permissionLevel: 5,
        recentActivity: "Today",

    },
    {
        name: "Member1",
        email: "something@email.com",
        permissionLevel: 5,
        recentActivity: "Today",

    },
    {
        name: "Member1",
        email: "something@email.com",
        permissionLevel: 5,
        recentActivity: "Today",

    },

]

const useStyles = makeStyles((theme) => ({
    searchBar: {
        background: 'rgba(136,90,248,0.2)'
    }
    
}))

function MySearchBar() {
    const classes = useStyles();
    return (
        <SearchBar className={classes.searchBar} fullWidth 
        placeholder="Search for a member" type="search" 
        variant="outlined" InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            )
        }}/>
    );
}

function MembersTable(props) {
    const classes = useStyles();
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'permissionLevel',
            headerName: 'Permission Level',
            width: 200,
        },
        {
            field: 'recentActivity',
            headerName: 'Recent Activity',
            width: 200,
        },
        {
            field: 'manage',
            headerName: 'Manage',
            width: 200,
        },
    ]

    return (
        <div></div>

    )
}




class Members extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div>
                <MySearchBar/>
                <Table></Table>
            </div>
        )
    }
}

export default Members;