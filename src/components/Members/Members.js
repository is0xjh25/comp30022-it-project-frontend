import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import InputAdornment from '@material-ui/core/InputAdornment';



import SearchIcon from '@material-ui/icons/Search';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useHistory,  useRouteMatch, useParams } from 'react-router-dom';


import Table from './Table';


import './Members.css'




const mockUser = {
    authorityLevel: 5
}


function Members() {
    let {path, url} = useRouteMatch();
    let {orgId, depId} = useParams();

    return(
        <div>
            <SearchBar />
            <div className='table-container'>
                <Table className='table' currentUser={mockUser} departmentId={depId}></Table>
            </div>
            
        </div>
    )
}

export default Members;