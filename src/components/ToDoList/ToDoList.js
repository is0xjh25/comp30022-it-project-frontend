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
import Collapse from '@mui/material/Collapse';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@mui/material'

import {
    getAllToDo,
    deleteToDo
} from '../../api/ToDoList';

import AddToDo from './AddToDo';
import UpdateToDo from './UpdateToDo';


function EnhancedToolbar(props) {
    // Use state for pop-up
    const [createOpen, setCreateOpen] = useState(false);

    const handleOpen = () => {
        setCreateOpen(true);
    }

    const handleClose = () => {
        setCreateOpen(false);
    }

    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
        }}
        >
            <Typography
                sx={{ flex: '1 1 100%', mb: 2 }}
                variant="h6"
                id="ToDoTitle"
                component="div"
            >
                Your To-Do List
            </Typography>
            <IconButton>
                <AddIcon variant="contained" onClick={() => {handleOpen()}}/>
            </IconButton>
            <AddToDo open={createOpen} handleClose={handleClose}/>
        </Toolbar>
    )
}

function EnhancedTableRow(props) {
    const { row, index, update } = props;
    const [expand, setExpand] = useState(false);
    const [selected, setSelected] = useState([]);

    const handleDelete = (id) => {
        deleteToDo(id).then(() => {
            alert("To-do event deleted");
        })
        console.log(id);
        console.log("deleted")
    }

    const handleClickCheckBox = (event, description) => {
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

    const checkInProgress = (row) =>{
        if (row.status === "to do") {
            // Get the scheduled time of the to-do list
            const scheduledTime = new Date(row.date_time.toString());

            // Get the current time
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes();
            const dateTime = date+' '+time;

            const currentTime = new Date(dateTime.toString());

            // Compare the two time
            if (scheduledTime.getTime() <= currentTime.getTime()) {
                return "in progress";
            } else {
                return "to do";
            }
        } else {
            return row.status;
        }

    }

    const getRowLabel = (status) => {
        if (status === "to do") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }

    }
    
    const isItemSelected = isSelected(row.description);
    const labelId = `enhanced-table-checkbox-${index}`;
    const rowLabel = getRowLabel(checkInProgress(row));

    // For edit to-do
    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(true);
        console.log(`edit to-do "${row.description}"`);
    }

    const handleEditClose = () => {
        setEditOpen(false);
    }

    return (
        <React.Fragment>
            <TableRow
                id={row.id}
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.description}
                selected={isItemSelected}
            >
                <TableCell padding="checkbox" style={{borderBottom:"none"}}>
                    <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClickCheckBox(event, row.description)}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell 
                    component="th"
                    scope="row"
                    padding="none"
                    style={{borderBottom:"none"}}
                    onClick={() => setExpand(!expand)}
                >
                    {row.description}
                </TableCell>
                <TableCell 
                    align="right" 
                    style={{borderBottom:"none"}}
                    onClick={() => setExpand(!expand)}
                >
                    { rowLabel }
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <Box >
                            <TableRow >
                                <TableCell 
                                    style={{borderBottom:"none"}}
                                    sx={{ width: '90%' }}
                                >
                                    Date and Time: {row.date_time}
                                </TableCell>
                                <TableCell 
                                    style={{borderBottom:"none"}}
                                    sx={{ width: '5%' }}
                                >
                                    <IconButton size="small" onClick={() => {handleEditOpen()}}>
                                        <EditIcon />
                                    </IconButton>
                                    <UpdateToDo original={row} open={editOpen} handleClose={handleEditClose} />
                                </TableCell>
                                <TableCell 
                                    style={{borderBottom:"none"}}
                                    sx={{ width: '5%' }}
                                >
                                    <IconButton size="small" onClick={() => {handleDelete(row.id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )

}

export default function ToDoList() {
    const [loading, setLoading] = useState(true);
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
    }, [])

    useEffect(() => {
        setLoading(false);
    }, [rows])

    if (loading) {
        return <div>loading...</div>
    }


    return (
        <Grid sx={{ width: '100%', align: 'center'}}>
            <Paper sx={{ width: '50%', mb: 2 }}>
                <EnhancedToolbar />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                    >
                        {rows.map((row, index) => {
                            return (
                                <EnhancedTableRow row={row} index={index}/>
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
