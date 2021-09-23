import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import CustomerTable from './CustomerTable';
import { getMyPermissionLevel } from '../../api/Manage';
import { useParams } from 'react-router-dom';

// const createData()

export default function Customer(props) {
    let {orgId, depId} = useParams();
    const [loading, setLoading] = useState(true);
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);

    useEffect(() => {
        getMyPermissionLevel(depId).then(res => {
            setMyPermissionLevel(res.data.authorityLevel);
        })

    }, [depId])

    useEffect(() => {
        setLoading(false);
    }, [])

    if (loading) {
        return <div>loading...
        </div>
    }    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <CustomerTable
                    aria-label="contact" 
                    stickyHeader 
                    permissionLevel={myPremissionLevel} 
                    organizationId={orgId} 
                    departmentId={depId}
                    handleDialogOpen={props.handleDialogOpen}
                />
            </TableContainer>
        </Paper>
    );
}
