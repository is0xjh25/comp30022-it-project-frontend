import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';
import { getMyPermissionLevel, searchMember } from '../../api/Manage';
import { useSnackbar } from 'notistack';
import Table from './Table';
import './Members.css'
import {
    Box, 
    Typography,
} from '@mui/material';




// A component that displays the members page for user to manage
export default function Members() {

    const { enqueueSnackbar } = useSnackbar();
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
                enqueueSnackbar(res.msg,{variant: 'error'});
            }
        })
    }
    return(
        <Box sx={{height: '100vh'}}>
            <SearchBar handleSearch={handleSearch} sx={{position: 'fixed', top: 0}}/>
            <Typography variant="h5" sx={{m: 3}}> Manage Members </Typography>
            <Table className='table' myPremissionLevel={myPremissionLevel}  departmentId={depId} rows={rows} setRows={setRows}></Table>
        </Box>
    )
}