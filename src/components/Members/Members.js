import React, {useState, useEffect} from 'react';

import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';


import Table from './Table';


import './Members.css'
import { getMyPermissionLevel, searchMember } from '../../api/Manage';


// A component that displays the members page for user to manage
function Members() {
    let {depId} = useParams();

    const [rows, setRows] = useState([]);

    // This is the permission level that the user has at this department
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);
    useEffect(() => {
        getMyPermissionLevel(depId).then(res => {
            setMyPermissionLevel(res.data.authority_level);
        })

    }, [])

    const handleSearch = function(searchKey) {
        searchMember(depId, searchKey, 10, 1).then(res => {
            console.log(res);
            if (res.code === 200) {
                const data = res.data
                const records = data.records
                records.forEach(row => {
                    row.name = row.first_name + ' ' + row.last_name
                });
                setRows(records);
                }else {
                alert(res.msg);
            }
        })
    }
    return(
        <div>
            <SearchBar handleSearch={handleSearch}/>
            <div className='table-container'>
                <Table className='table' myPremissionLevel={myPremissionLevel}  departmentId={depId} rows={rows} setRows={setRows}></Table>
            </div>
            
        </div>
    )
}

export default Members;