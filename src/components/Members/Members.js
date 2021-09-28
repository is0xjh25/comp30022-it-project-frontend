import React, {useState, useEffect} from 'react';

import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';


import Table from './Table';


import './Members.css'
import { getMyPermissionLevel } from '../../api/Manage';


// A component that displays the members page for user to manage
function Members() {
    let {depId} = useParams();
    // This is the permission level that the user has at this department
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);
    useEffect(() => {
        getMyPermissionLevel(depId).then(res => {
            setMyPermissionLevel(res.data.authority_level);
        })

    }, [])
    return(
        <div>
            <SearchBar />
            <div className='table-container'>
                <Table className='table' myPremissionLevel={myPremissionLevel}  departmentId={depId}></Table>
            </div>
            
        </div>
    )
}

export default Members;