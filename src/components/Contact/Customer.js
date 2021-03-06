import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerTable from './CustomerTable';
import { getMyPermissionLevel } from '../../api/Manage';
import { Paper, TableContainer } from '@mui/material';

// This component reads organization id and department id from parameters
// and return a table of contacts
export default function Customer(props) {
    
    let {orgId, depId} = useParams();
    const [myPremissionLevel, setMyPermissionLevel] = useState(0);

    // Request current user's permission level from backend
    // to determine whether some features are activated or not
    useEffect(() => {
        getMyPermissionLevel(depId).then(res => {
            setMyPermissionLevel(res.data.authority_level);
        })

    }, [depId])


    // Refer to customer table for layout
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
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
