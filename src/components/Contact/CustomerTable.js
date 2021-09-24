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
import { Dialog } from '@mui/material';
import AlertDialog from '../Dialog/AlertDialog';
import SelectDialog from '../Dialog/SelectDialog';
import { getAllCustomer, handleDeleteCustomer } from '../../api/Contact';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material'
import { getOrganization, getDepartment } from '../../api/Manage';
import DispalyCustomer from './DisplayCustomer';
import AddCustomer from './AddCustomer';
import { useHistory, useRouteMatch } from 'react-router';

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

const EnhancedTableToolbar = (props) => {
    const { organizationId, departmentId, handleDialogOpen } = props;
    const [orgName, setOrgName] = useState();
    const [depName, setDepName] = useState();

    useEffect(() => {
        getOrganization().then(res => {
            if (res.ok) {
                res.json().then(body => {
                    const data = body.data;
                    data.forEach(organization => {
                        if (organization.id == organizationId) {
                            setOrgName(organization.name);
                        } else {
                            // alert("Organization name not found")
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
                        if (department.id == departmentId) {
                            setDepName(department.name);
                        } else {
                            // alert("Organization name not found")
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

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
                // ...(numSelected > 0 && {
                //     bgcolor: (theme) =>
                //     alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                // }),
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
            {/* <Tooltip title="Filter list"> */}
            <IconButton>
                <FilterListIcon onClick={handleChangeOrgDep}/>
            </IconButton>
            {/* </Tooltip> */}
            <Button variant="contained" onClick={handleCreateContact}
            >
                Add Contact
            </Button>

            <Dialog
            open={createContactOpen}
            fullWidth
            maxWidth
            >
                <Paper fullWidth>
                <AddCustomer departmentId={departmentId} handleClose={handleClose}/>
                </Paper>
                
            </Dialog>

        </Toolbar>
    )
}

// EnhancedTableToolbar.propTypes = {
// };

function EnhancedTableRow(props) {
    const {row, permissionLevel, update} = props;
    const history = useHistory();
    const {url} = useRouteMatch();
    console.log(url);
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
        handleDeleteCustomer(row.id);
        alert(`${row.name} is deleted`);
        setAlertOpen(false);
        update();
    }

    //=============== Display Delete Button =============
    var display;
    if (permissionLevel > 3) {
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
        <TableRow hover onClick={onRowClick} role="checkbox" key={row.customer_id}>
            <TableCell align="center" component="th" scope="row" padding="none">
                {row.name}
            </TableCell>
            <TableCell align="center">
                {row.email}
            </TableCell>
            <TableCell align="center" component="th" scope="row" padding="none">
                {row.gender}
            </TableCell>
            <TableCell align="center">
                {row.age}
            </TableCell>
            <TableCell align="center" component="th" scope="row" padding="none">
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

            
            {/* <SelectDialog
                items={selectItems}
                currentSelected={currentSelected}
                title={`Change role for ${row.name}`}
                label="Role"
                open={selectOpen}
                handleChange={selectChange}
                handleClose={selectClose}
                handleConfirm={handleSelectConfirm}
            /> */}
        </TableRow>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

export default function CustomerTable(props) {
    //=============== Data from Parent ==================
    const permissionLevel = props.permissionLevel;
    const organizationId = props.organizationId;
    const departmentId = props.departmentId;
    // const handleDialogOpen = props.handleDialogOpen;

    //=============== Table Settings ==================
    const classes = useStyles();
    // const [order, setOrder] = useState('asc');
    // const [orderBy, setOrderBy] = useState('manage');
    // const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [updateCount, setUpdateCount] = useState(0);
    const [rows, setRows] = useState([]);
    // const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    useEffect(() => {
        getAllCustomer(organizationId, departmentId, rowsPerPage, currentPage).then(res => {
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
    }, [departmentId, updateCount])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <EnhancedTableToolbar organizationId={organizationId} departmentId={departmentId} handleDialogOpen={props.handleDialogOpen}/>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table Contact aria-label="contact" stickyHeader height={100}>
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
    );
}
