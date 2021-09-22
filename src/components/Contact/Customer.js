import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomerTable from './CustomerTable';
import { getAllCustomer } from '../../api/Contact';

// const createData()

export default function Customer() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

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
                <CustomerTable aria-label="contact" stickyHeader />
            </TableContainer>
        </Paper>
    );
}
