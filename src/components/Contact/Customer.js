import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';

import CustomerTable from './CustomerTable';

export default function Customer() {
    const [loading, setLoading] = useState(true);

    const {orgId, depId} = useParams();

    const mockUser = {
        authorityLevel: 5
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    const handleClick = () => {
        alert("clicked")
    }

    if (loading) {
        return <div>loading...
        </div>
    }    

    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <CustomerTable aria-label="contact" stickyHeader currentUser={mockUser} organizationId={orgId} departmentId={depId}/>
            </TableContainer>
        </Paper>
    );
}
