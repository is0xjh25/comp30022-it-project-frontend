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

import { getAllCustomer } from '../../api/Contact';

// functions for sorting 
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

const columns = [
    { id: 'firstName', label: 'First Name', minWidth: 120},
    { id: 'lastName', label: 'Last Name', minWidth: 120},
    { id: 'email', label: 'Email', minWidth: 280},
    { id: 'gender', label: 'Gender', minWidth: 120, align: 'center'},
    {
        id: 'age',
        label: 'Age',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'organization', label: 'Oraganization', minWidth: 160,  align: 'center'},
    { id: 'deleteButton', minWidth: 100}
    ];

// const createData()

export default function Customer() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, [])

    // useEffect(() => {
    //     getAllCustomer()
    // })

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
                "lastName": "Cujoh",
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
                "lastName": "Cujoh",
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
                <Table Contact aria-label="contact" stickyHeader>
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
                                <TableRow onClick={handleClick} hover role="checkbox" tabIndex={-1} key={row.code}>
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
