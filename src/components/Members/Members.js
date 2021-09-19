import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import InputAdornment from '@material-ui/core/InputAdornment';



import SearchIcon from '@material-ui/icons/Search';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Table from './Table';


import './Members.css'




const mockUser = {
    authorityLevel: 5
}


class Members extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div>
                <SearchBar />
                <div className='table-container'>
                    <Table className='table' currentUser={mockUser} departmentId={5}></Table>
                </div>
                
            </div>
        )
    }
}

export default Members;