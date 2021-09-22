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
import AlertDialog from '../Dialog/AlertDialog';
import SelectDialog from '../Dialog/SelectDialog';
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
    { id: 'Name', label: 'Name', minWidth: 200},
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

const permissionLevels = [
    {authorityLevel: 0, name: 'Pending to join'},
    {authorityLevel: 1, name: 'Member'},
    {authorityLevel: 2, name: 'Department admin'},
    {authorityLevel: 3, name: 'Department admin'},
    {authorityLevel: 4, name: 'Department admin'},
    {authorityLevel: 5, name: 'Organization Owner'}
]

const permissionLevelMap = {
    0 : 'Pending to join',
    1 : 'Member',
    2 : 'Department admin',
    3 : 'Department admin',
    4 : 'Department admin',
    5 : 'Organization Owner'
}

function EnhancedTableRow(props) {
    const {row, currentUser, organizationId, departmentId, update} = props;

    //=============== Display Delete Button =============
    const display;
    if (currentUser.authorityLevel > 3) {
        display = (
                <div>
                    <IconButton onClick={handleDeleteCustomer}>
                        <DeleteIcon />
                    </IconButton>
                </div>)
    } else {
        display = (<div></div>)
    }

    //=============== Delete Customer ==================
    const [alertOpen, setAlertOpen] = useState(false);
    const alertTitle = 'Delete Confirm';
    const alertMessage = `Do you want to delete ${row.name}?`;
    const handleDeleteCustomer = function() {
        setAlertOpen(true);
    }
    const handleAlertConfirm = function() {
        deleteCustomer(row.customerId, organizationId, departmentId);
        alert(`${row.name} is deleted`);
        setAlertOpen(false);
        update();
    }

    return (
        <TableRow hover role="checkbox" key={row.customerId}>
            <TableCell component="th" scope="row" padding="none">
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
    const currentUser = props.currentUser;
    const organizationId = props.organizationId;
    const departmentId = props.departmentId;

    //=============== Table Settings ==================
    const classes = useStyles();
    // const [order, setOrder] = useState('asc');
    // const [orderBy, setOrderBy] = useState('manage');
    // const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(true);
    const [updateCount, setUpdateCount] = useState(0);
    const [rows, setRows] = useState([]);

    const update = function() {
        setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
    }

    useEffect(() => {
        getAllCustomer(organizationId, departmentId).then(res => {
            if (res.code === 200) {
                const data = res.data
                const records = data.records
                records.forEach(row => {
                    row.name = row.firstName + ' ' + row.lastName
                });
                setRows(records);
            } else {
                alert("Failed to fetch table data")
            }
        })
    }, [updateCount])


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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
                                <EnhancedTableRow  hover
                                    onClick={handleClick} 
                                    role="checkbox" 
                                    tabIndex={-1} 
                                    key={row.customerId}
                                    currentUser={currentUser}
                                    organizationId={organizationId}
                                    departmentId={departmentId}
                                    update={update}
                                >
                                    {/* {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })} */}
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
