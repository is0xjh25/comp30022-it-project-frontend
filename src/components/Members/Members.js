import React, {useState, useEffect} from 'react';

import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';


import Table from './Table';


import './Members.css'
import { getMyPermissionLevel } from '../../api/Manage';



function Members() {
    let {depId} = useParams();
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);
    useEffect(() => {
        getMyPermissionLevel(depId).then(res => {
            console.log(res);
            setMyPermissionLevel(res.data);
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