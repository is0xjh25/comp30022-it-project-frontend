import React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'firstName', label: 'First Name', minWidth: 170},
    { id: 'lastName', label: 'Last Name', minWidth: 170},
    { id: 'email', label: 'Email', minWidth: 300},
    { id: 'gender', label: 'Gender', minWidth: 170, align: 'right'},
    {
        id: 'age',
        label: 'Age',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'organization',
        label: 'Oraganization',
        minWidth: 200,
        align: 'right'
    },
    ];


export default function Contacts() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, [])

    useEffect(() => {
        // make up some fake data for testing
        const data = [
            {
                "firstName": "Lingxiao",
                "lastName": "Li",
                "email": "lingxiao1@student.unimelb.edu.au",
                "gender": "male",
                "age": 22,
                "organization": "yyds"
            },
            {
                "firstName": "Yiyang",
                "lastName": "Huang",
                "email": "yiyahuang@student.unimelb.edu.au",
                "gender": "male",
                "age": 22,
                "organization": "yyds"
            },
            {
                "firstName": "Kaiyuan",
                "lastName": "Zheng",
                "email": "kzzhe@student.unimelb.edu.au",
                "gender": "male",
                "age": 3,
                "organization": "yyds"
            },
            {
                "firstName": "Yongfeng",
                "lastName": "Qin",
                "email": "yongfengq@student.unimelb.edu.au",
                "gender": "male",
                "age": 22,
                "organization": "yyds"
            },
            {
                "firstName": "Yun-Chi",
                "lastName": "Hsiao",
                "email": "yunchi@student.unimelb.edu.au",
                "gender": "male",
                "age": 22,
                "organization": "yyds"
            },
            {
                "firstName": "Jonathan",
                "lastName": "Joestar",
                "email": "123@456.com",
                "gender": "male",
                "age": 19,
                "organization": "JOJO1"
            },
            {
                "firstName": "Joseph",
                "lastName": "Joestar",
                "email": "123@456.com",
                "gender": "male",
                "age": 19,
                "organization": "JOJO2"
            },
            {
                "firstName": "Jotaro",
                "lastName": "Kuujo",
                "email": "123@456.com",
                "gender": "male",
                "age": 19,
                "organization": "JOJO3"
            },
            {
                "firstName": "Jousuke",
                "lastName": "Higashikata",
                "email": "123@456.com",
                "gender": "male",
                "age": 19,
                "organization": "JOJO4"
            },
            {
                "firstName": "Gioruno",
                "lastName": "Giobana",
                "email": "123@456.com",
                "gender": "male",
                "age": 16,
                "organization": "JOJO5"
            },
            {
                "firstName": "Jolyn",
                "lastName": "Kuujo",
                "email": "123@456.com",
                "gender": "female",
                "age": 19,
                "organization": "JOJO6"
            },
            {
                "firstName": "Jonny",
                "lastName": "Joestar",
                "email": "123@456.com",
                "gender": "male",
                "age": 22,
                "organization": "JOJO7"
            },
            {
                "firstName": "Jousuke",
                "lastName": "Higashikata",
                "email": "123@456.com",
                "gender": "male",
                "age": 17,
                "organization": "JOJO8"
            }
        ]
        return () => {
            setRows(data);
        }
    }, [loading])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return <div>loading...
        </div>
    }    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table Contact aria-label="contact">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}
