import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import {
    getAllToDo,
    handleCreateToDo,
    handleDeleteToDo,
    handleUpdateToDo
} from '../../api/ToDoList';

export default function ToDoList() {
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllToDo().then(res => {
            if (res.code === 200) {
                console.log(res)
                const data = res.data;
                setRows(data);
            } else {
                alert(res.msg)
            }
        })
        setLoading(false);
    }, [])

    if (loading) {
        return <div>loading...</div>
    }

    // const test = [
    //     { 
    //         description: "to do sample 1",
    //         status: "to do"
    //     },
    //     { 
    //         description: "to do sample 2",
    //         status: "to do"
    //     },
    //     { 
    //         description: "to do sample 3",
    //         status: "in progress"
    //     },
    //     { 
    //         description: "to do sample 4",
    //         status: "in progress"
    //     },
    //     { 
    //         description: "to do sample 5",
    //         status: "done"
    //     }
    // ]

    const handleClick = (event, description) => {
        const selectedIndex = selected.indexOf(description);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, description);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const getRowLabel = (status) => {
        if (status === "to do") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }

    }

    return (
        <Grid sx={{ width: '100%', align: 'center'}}>
            <Paper sx={{ width: '50%', mb: 2 }}>
                <Typography
                    sx={{ flex: '1 1 100%', mb: 2 }}
                    variant="h6"
                    id="ToDoTitle"
                    component="div"
                >
                    Your To-Do List
                </Typography>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                    >
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.description);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            const rowLabel = getRowLabel(row.status)

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.description)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.description}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell 
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        { rowLabel }
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </Table>
                </TableContainer>

                
            </Paper>
        </Grid>
    )
}


// function EnhancedTabl() {
//     const [selected, setSelected] = React.useState([]);

//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1),
//             );
//         }

//         setSelected(newSelected);
//     };

//     const isSelected = (name) => selected.indexOf(name) !== -1;

//     // Avoid a layout jump when reaching the last page with empty rows.
//     // const emptyRows =
//     //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Paper sx={{ width: '100%', mb: 2 }}>
//                 <TableContainer>
//                     <Table
//                         sx={{ minWidth: 750 }}
//                         aria-labelledby="tableTitle"
//                         size={dense ? 'small' : 'medium'}
//                     >
//                         <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy)) */}
//                             {rows
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row, index) => {
//                                     const isItemSelected = isSelected(row.name);
//                                     const labelId = `enhanced-table-checkbox-${index}`;

//                                 return (
//                                     <TableRow
//                                         hover
//                                         onClick={(event) => handleClick(event, row.name)}
//                                         role="checkbox"
//                                         aria-checked={isItemSelected}
//                                         tabIndex={-1}
//                                         key={row.name}
//                                         selected={isItemSelected}
//                                     >
//                                         <TableCell padding="checkbox">
//                                             <Checkbox
//                                                 color="primary"
//                                                 checked={isItemSelected}
//                                                 inputProps={{
//                                                     'aria-labelledby': labelId,
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell
//                                             component="th"
//                                             id={labelId}
//                                             scope="row"
//                                             padding="none"
//                                         >
//                                             {row.name}
//                                         </TableCell>
//                                         <TableCell align="right">{row.calories}</TableCell>
//                                         <TableCell align="right">{row.fat}</TableCell>
//                                         <TableCell align="right">{row.carbs}</TableCell>
//                                         <TableCell align="right">{row.protein}</TableCell>
//                                     </TableRow>
//                                 );
//                                 })}
//                             {emptyRows > 0 && (
//                                 <TableRow
//                                     style={{
//                                         height: (dense ? 33 : 53) * emptyRows,
//                                     }}
//                                     >
//                                     <TableCell colSpan={6} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>
//         </Box>
//     );
// }
