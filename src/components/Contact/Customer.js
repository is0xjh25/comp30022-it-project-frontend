import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import CustomerTable from './CustomerTable';
import { getMyPermissionLevel } from '../../api/Manage';
import { useParams } from 'react-router-dom';

// const createData()

export default function Customer() {
    console.log("contact1")
    let {orgId, depId} = useParams();
    const [loading, setLoading] = useState(true);
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);

    useEffect(() => {
        console.log("contact4")
        console.log(orgId)
        console.log(depId)
        getMyPermissionLevel(depId).then(res => {
            setMyPermissionLevel(res.data.authorityLevel);
            console.log(myPremissionLevel)
        })

    }, [])

    useEffect(() => {
        setLoading(false);
        console.log("contact2")
    }, [])

    if (loading) {
        console.log("contact3")
        return <div>loading...
        </div>
    }    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <CustomerTable aria-label="contact" stickyHeader permissionLevel={myPremissionLevel} organizationId={orgId} departmentId={depId}/>
            </TableContainer>
        </Paper>
    );
}
