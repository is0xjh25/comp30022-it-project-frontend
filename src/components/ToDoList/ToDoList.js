import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// Import from MUI
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    Chip,
    Grid,
    Collapse,
    IconButton,
    LinearProgress
} from '@mui/material';
// Import from local
import {
    getAllToDo,
    updateToDo,
    deleteToDo
} from '../../api/ToDoList';
import { formatTime } from '../../api/Util';
import AddToDo from './AddToDo';
import UpdateToDo from './UpdateToDo';

const classes = {
    title: {
        fontSize:30,
        fontFamily:'NTR',
        fontWeight:'bold',
        bgcolor:'#35baf6',
        borderRadius:100
    }
};

// Implement a new toolbar to hold table title and add new to-do button
function EnhancedToolbar(props) {
    const { update } = props;

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
            justifyContent: 'center'
        }}
        >
            <IconButton>
                <AddIcon variant="contained" color="primary"  onClick={() => {handleOpen()}}/>
            </IconButton>
            <AddToDo open={createOpen} handleClose={handleClose} update={update}/>
        </Toolbar>
    )
}

// Implement a new table row
function EnhancedTableRow(props) {
    const { row, update } = props;
    const [expand, setExpand] = useState(false); 
    const { enqueueSnackbar } = useSnackbar();
    // For displaying to-do
    const getRowLabel = (status) => {
        if (status === "to do") {
            return (<Chip label={status} color="primary" size="small"/>)
        } else if (status === "in progress") {
            return (<Chip label={status} color="warning" size="small"/>)
        } else {
            return (<Chip label={status} color="success" size="small"/>)
        }

    }

    const rowLabel = getRowLabel(row.status);
    
    // For deleting to-do
    const handleDelete = (id) => {
        deleteToDo(id).then(() => {
            enqueueSnackbar("To-do event deleted!",{variant: 'success'});
            update();
        })
    }
    
    // For selecting checkbox
    const isSelected = (status) => {
        if (status === "done") {
            return true;
        }
        return false;
    }
    
    // For displaying if a checkbox is checked
    const [selected, setSelected] = useState(isSelected(row.status))

    const handleClickCheckBox = (event, status) => {
        // Set the to-do status as done
        let statusChange = "done";
        if (status === "done") {
            statusChange = "to do";
        }
        
        const data = {
            "id": row.id,
            "date_time": row.date_time,
            "description": row.description,
            "status": statusChange
        }

        updateToDo(data).then(res => {
            if (res.code === 200) {
                enqueueSnackbar("Successfully updated!",{variant:'success'});
                update();
            } else {
                enqueueSnackbar(res.msg,{variant:'error'});
            }
        })
    };

    // For editing to-do
    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(true);
    }

    const handleEditClose = () => {
        setEditOpen(false);
    }

    // Update expand and selected everytime the row is updated
    useEffect(() => {
        setExpand(false)
        setSelected(isSelected(row.status))
    }, [row])

    // Format the time display of todos
    const displayTime = (time) => {
        const localTime = new Date(time);
        
        const dateMonth = formatTime(localTime, 'MM-dd');
        const year = localTime.getFullYear();
        const hourMinite = formatTime(localTime, 'HH:mm')

        return (year+'-'+dateMonth+' '+hourMinite);
    }

    return (
        <React.Fragment>
            <TableRow
                id={row.id}
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.description}
            >
                <TableCell padding="checkbox" style={{borderBottom:"none"}}>
                    <Checkbox
                        color="primary"
                        checked={selected}
                        onClick={(event) => handleClickCheckBox(event, row.status)}
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
                                    Due Date: {displayTime(row.date_time)}
                                </TableCell>
                                <TableCell 
                                    style={{borderBottom:"none"}}
                                    sx={{ width: '5%' }}
                                >
                                    <IconButton size="small" onClick={() => {handleEditOpen()}}>
                                        <EditIcon />
                                    </IconButton>
                                    <UpdateToDo original={row} open={editOpen} handleClose={handleEditClose} update={update}/>
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

    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [updateCount, setUpdateCount] = useState(0);
    const [rows, setRows] = useState([]);
    
    const update = () => {
        setTimeout(() => {setUpdateCount(updateCount + 1)}, 1000);
    }

    useEffect(() => {
        getAllToDo().then(res => {
            if (res.code===200) {
                const data = res.data;
                setRows(data);
            } else {
                enqueueSnackbar(res.msg,{variant: 'error'});
            }
        })
    }, [updateCount])

    useEffect(() => {
        setLoading(false);
    }, [rows])

    // Display loading page if the request is not finished
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    return (
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grid sx={{ width: '100%', mr:"6%" }}>
            <Typography sx={classes.title} textAlign="center">ToDo List</Typography>
                <EnhancedToolbar update={update}/>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                    >
                        {rows.map((row) => {
                            return (
                                <EnhancedTableRow row={row} update={update}/>
                            )
                        })}

                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
