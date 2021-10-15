import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

// Import from mui
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ImageIcon from '@material-ui/icons/Image';
import { height } from '@mui/system';
import { 
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Toolbar,
    Button,
    Avatar,
    Dialog,
    IconButton,
    LinearProgress,
    Box
} from '@mui/material'

// Import from local
import AlertDialog from '../Dialog/AlertDialog';
import SearchBar from '../SearchBar/SearchBar';
import AddCustomer from './AddCustomer';
import { getAllCustomer, deleteCustomer as deleteCustomerBackend, searchCustomer } from '../../api/Contact';
import { getOrganization, getDepartment } from '../../api/Manage';
import { processPhoto } from '../../api/Photo';

// Columns are the labels of the table
const columns = [
    { id: 'avatar', label: 'Avator', minWidth: 40, align: 'center'},
    { id: 'name', label: 'Name', minWidth: 180, align: 'center'},
    { id: 'email', label: 'Email', minWidth: 240, align: 'center'},
    { id: 'gender', label: 'Gender', minWidth: 120, align: 'center'},
    {
        id: 'age',
        label: 'Age',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'organization', label: 'Company', minWidth: 160,  align: 'center'},
    { id: 'deleteButton', minWidth: 100}
    ];

// Create a toolbar component based on toolbar component, it shows the table title,
// Current organization and department, filter button, and create new contact button(if apply)
const EnhancedTableToolbar = (props) => {
    const { organizationId, departmentId, handleDialogOpen, update, permissionLevel} = props;
    const [orgName, setOrgName] = useState();
    const [depName, setDepName] = useState();

    // Request data from backend API, record the name of current organization and department
    useEffect(() => {
        getOrganization().then(res => {
            if (res.ok) {
                res.json().then(body => {
                    const data = body.data;
                    data.forEach(organization => {
                        if (organization.id.toString() === organizationId) {
                            setOrgName(organization.name);

                        }
                    });
                })
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        });
        
        getDepartment(organizationId).then(res => {
            if (res.ok) {
                res.json().then(body => {
                    const data = body.data;
                    data.forEach(department => {
                        if (department.id.toString() === departmentId) {
                            setDepName(department.name);
                        } 
                    });
                })
            } else {
                res.json().then(body => {alert(body.msg)});
            }
        });
    }, [departmentId])

    const handleChangeOrgDep = () => {
        handleDialogOpen();
    }

    // Create new contact
    const [createContactOpen, setCreateContactOpen] = useState(false);

    const handleCreateContact = () => {
        setCreateContactOpen(true);
    }
    const handleClose = () => {
        setCreateContactOpen(false);
    }

    const createButtonDisplay = (permission) => {
        if (permission > 1) {
            return (
                <Button variant="contained" onClick={handleCreateContact}>
                    Add Contact
                </Button>
            )
        }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 60%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Contacts
            </Typography>
            <Typography
                sx={{ flex: '1 1 15%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {orgName} / {depName}
            </Typography>
            <IconButton>
                <FilterListIcon onClick={handleChangeOrgDep}/>
            </IconButton>
            { createButtonDisplay(permissionLevel) }
            <Dialog
                open={createContactOpen}
                fullWidth
                maxWidth
            >
                <Paper fullWidth>
                    <AddCustomer departmentId={departmentId} handleClose={handleClose} update={update}/>
                </Paper>
            </Dialog>
        </Toolbar>
    )
}

// Create a new table row component, including link to contact detail and delete contact
function EnhancedTableRow(props) {
    const {row, permissionLevel, update} = props;
    const history = useHistory();
    const {url} = useRouteMatch();
    const onRowClick = () => {
        history.push(`${url}/${row.id}`);
    }

    //=============== Delete Customer ==================
    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Delete Confirm';
    const alertMessage = `Do you want to delete ${row.name}?`;
    const deleteCustomer = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        deleteCustomerBackend(row.id).then(res => {
			if (res.code === 200) {
                alert(`${row.name} is deleted!`);
                setAlertOpen(false);
                update();
			} else {
				res.json().then(bodyRes=>{alert(bodyRes.msg);});
			}

		});

    }

    //=============== Display Delete Button =============
    // If the user's authority level meets the requirement, display the delete button
    let display;
    if (permissionLevel >= 3) {
        display = (
            <div>
                <IconButton onClick={deleteCustomer}>
                    <DeleteIcon />
                </IconButton>
            </div>)
    } else {
        display = (<div></div>)
    }

    return (
        <TableRow hover role="checkbox" key={row.customer_id}>
            <TableCell onClick={onRowClick} align="center" component="th" scope="row" padding="normal">
                <Avatar src={processPhoto(row.photo)} sx={{align: 'right'}}>

                </Avatar>
            </TableCell>
            <TableCell onClick={onRowClick} align="center" component="th" scope="row" padding="none">
                {row.name}
            </TableCell>
            <TableCell onClick={onRowClick} align="center">
                {row.email}
            </TableCell>
            <TableCell onClick={onRowClick} align="center" component="th" scope="row" padding="none">
                {row.gender}
            </TableCell>
            <TableCell onClick={onRowClick} align="center">
                {row.age}
            </TableCell>
            <TableCell onClick={onRowClick} align="center" component="th" scope="row" padding="none">
                {row.organization}
            </TableCell>
            <TableCell align="center">
                {display}
            </TableCell>

            <AlertDialog alertTitle={alertTitle} 
                alertMessage={alertMessage}
                open={alertOpen}
                handleClose={() => {setAlertOpen(false)}}
                handleConfirm={handleAlertConfirm}
                handleCancel={() => {setAlertOpen(false)}}/>

        </TableRow>
    )
}

// The final table for contact
export default function CustomerTable(props) {
    const [loading, setLoading] = useState(true);

    //=============== Data from Parent ==================
    const permissionLevel = props.permissionLevel;
    const organizationId = props.organizationId;
    const departmentId = props.departmentId;

    //=============== Table Settings ==================
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [updateCount, setUpdateCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    // Request contact data from backend API
    useEffect(() => {
        getAllCustomer(organizationId, departmentId, rowsPerPage, currentPage).then(res => {
            if (res.code === 200) {
                const data = res.data
                const records = data.records
                records.forEach(row => {
                    row.name = row.first_name + ' ' + row.last_name
                });
                setRows(records);
                setLoading(false);
            } else {
                alert(res.msg);
            }

        })
    }, [departmentId, updateCount])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (searchKey) => {
        searchCustomer(departmentId, searchKey, rowsPerPage, currentPage).then(res => {
            if (res.code === 200) {
                const data = res.data
                const records = data.records
                records.forEach(row => {
                    row.name = row.first_name + ' ' + row.last_name
                });
                setRows(records);
            } else {
                alert(res.msg);
            }
        })
    }

    // Display loading page if the request is not finished
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    // Make use of enhanced table toolbar and enhanced table row, diplay the data accordingly
    return (
        <div>
            <SearchBar handleSearch={handleSearch} />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <EnhancedTableToolbar 
                organizationId={organizationId} 
                departmentId={departmentId} 
                handleDialogOpen={props.handleDialogOpen} 
                update={update}
                permissionLevel={permissionLevel}
                />
                <TableContainer>
                    <Table aria-label="contact" stickyHeader>
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
                                    <EnhancedTableRow
                                        key={row.id}
                                        row={row}
                                        permissionLevel={permissionLevel}
                                        update={update}
                                    >
                                    </EnhancedTableRow>
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
        </div>
    );
}
