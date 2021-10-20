// Reference: https://material-ui.com/components/tables/#sorting-amp-selecting
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import Delete from '@material-ui/icons/Delete';
import Mail from '@material-ui/icons/MailOutline';
import EditPermission from '@material-ui/icons/Person';
import { getAllUsers, changePermission, acceptUser, deleteUser, declineUser } from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';
import SelectDialog from '../Dialog/SelectDialog';
import {processPhoto} from '../../api/Photo';
import {formatTime} from '../../api/Util';
import { useSnackbar } from 'notistack';
import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    IconButton,
    Avatar,
    Button
} from '@mui/material';

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'permissionLevel', numeric: true, disablePadding: false, label: 'Permission Level' },
  { id: 'recentActivity', numeric: true, disablePadding: false, label: 'Recent Activity' },
  { id: 'manage', numeric: true, disablePadding: false, label: 'Manage' },
];

// The table head of the table
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// The permission levels in the department
const permissionLevels = [
  {authorityLevel: 0, name: 'Pending to join'},
  {authorityLevel: 1, name: 'Member'},
  {authorityLevel: 2, name: 'Department supervisor'},
  {authorityLevel: 3, name: 'Department manager'},
  {authorityLevel: 4, name: 'Department admin'},
  {authorityLevel: 5, name: 'Organization Owner'}
]

const permissionLevelMap = {
  0 : 'Pending to join',
  1 : 'Member',
  2 : 'Department supervisor',
  3 : 'Department manager',
  4 : 'Department admin',
  5 : 'Organization Owner'
}

// Each row of the table, containing states about popups
function EnhancedTableRow(props) {
  const {row, myPremissionLevel, departmentId, update} = props;
  const { enqueueSnackbar } = useSnackbar();

  //================ Delete Member ==================

  const [alertOpen, setAlertOpen] = useState(false);
  const alertTitle = 'Delete Confirm';
  const alertMessage = `Do you want to delete ${row.name}?`;
  const handleDeleteMember = function() {
    setAlertOpen(true);
  }
  const handleAlertConfirm = function() {
    deleteUser(row.user_id, departmentId).then(res => {
        if(res.code === 200) {
            enqueueSnackbar(`${row.name} is deleted`,{
                variant: 'success',
            });
            setAlertOpen(false);
            update();
        }else {
            enqueueSnackbar(res.msg,{
                variant: 'error',
            });
        }
    });

  }

  //================ Change permission level ==================
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(-1);
  
  const selectItems = permissionLevels
  .filter((item) => {
    return (item.authorityLevel !== 0) && (item.authorityLevel < myPremissionLevel);
  })
  .map((item) => {
    return {value: item.authorityLevel, name: item.name};
  });

  // Closes the selected dialog, reset current selected
  const selectClose = function() {
    setSelectOpen(false);
    setCurrentSelected(-1);
  }

  const selectChange = function(event) {
    setCurrentSelected(Number(event.target.value) || -1);
  }
  const handleChangeRole = function() {
    setSelectOpen(true);
  }
  // When assign role is confirmed
  const handleSelectConfirm = function() {
    if(currentSelected && currentSelected > 0) { // -1 and 0 are not valid
        enqueueSnackbar(`${row.name} is now assigned to ${permissionLevelMap[currentSelected]}`,{
            variant: 'success',
        });
      changePermission(row.user_id, currentSelected, departmentId);
      setSelectOpen(false);
      setCurrentSelected(-1);
    } else {
        enqueueSnackbar('Select a valid role!',{variant: 'error'});
    }
    update();
  }

  const handleAccept = function() {
    acceptUser(row.user_id, departmentId).then(res => {
        if(res.code === 200) {
            update();
        }else {
            enqueueSnackbar(res.msg,{variant: 'error'});
        }
    });
    
  }

  const handleDecline = function() {
    declineUser(row.user_id, departmentId).then(res => {
        if(res.code === 200) {
            update();
        }else {
            enqueueSnackbar(res.msg,{variant: 'error'});
        }
    });
  }

  var manage;
  if (row.authority_level === 0) {
    manage = (
      <div>
        <Button variant='contained' onClick={handleAccept}>
          Accept
        </Button>
        <Button variant='outlined' onClick={handleDecline}>
          Decline
        </Button>
      </div>)
  } else if (myPremissionLevel > row.authority_level) {
    manage = (
      <div>
        <IconButton onClick={handleChangeRole}>
          <EditPermission />
        </IconButton>
        <Link color="inherit" href = {`mailto:${row.email}`}>
          <IconButton>
            <Mail />
          </IconButton>
        </Link>
        <IconButton onClick={handleDeleteMember}>
          <Delete />
        </IconButton>
      </div>
    )
  } else {
    manage = (
      <div>
        <Link color="inherit" href = {`mailto:${row.email}`}>
          <IconButton>
            <Mail />
          </IconButton>
        </Link>
      </div>
    )
  }

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.user_id}
    >
      
      <TableCell padding="normal">
        <Avatar src={processPhoto(row.photo)} sx={{ align: 'center'}}>
          <ImageIcon/>
        </Avatar>
      </TableCell>
      <TableCell align="center" component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{permissionLevelMap[row.authority_level]}</TableCell>
      <TableCell align="center">{row.recent_activity === null ? '' : formatTime(row.recent_activity, 'MM-dd HH:mm')}</TableCell>
      <TableCell align="center">
        {manage}
      </TableCell>
      
      <AlertDialog alertTitle={alertTitle}
      alertMessage={alertMessage}
      open={alertOpen}
      handleClose={() => { setAlertOpen(false) }} // Close the alert dialog
      handleConfirm={handleAlertConfirm}
      handleCancel={() => { setAlertOpen(false) }}
      />

      <SelectDialog
        items={selectItems}
        currentSelected={currentSelected}
        title={`Change role for ${row.name}`}
        label="Role"
        open={selectOpen}
        handleChange={selectChange}
        handleClose={selectClose}
        handleConfirm={handleSelectConfirm}
      />

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


// Table to display members
export default function EnhancedTable(props) {
    
  const { enqueueSnackbar } = useSnackbar();

  //================ Data from parent ==================
  const { rows, setRows, departmentId, myPremissionLevel } = props;

  //================ Table settings ==================
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('manage');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [updateCount, setUpdateCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  const update = function() {
    setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
  }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  // Fetch the initial data of the table
  useEffect(function fetchTableData() {
    if (departmentId) {
      getAllUsers(departmentId, 9999, 1).then(res => {
        if (res.code === 200) {
            const data = res.data
            const records = data.records
            records.forEach(row => {
                row.name = row.first_name + ' ' + row.last_name
            });
            setRows(records);
            setTotalSize(res.data.total)
            }else {
                enqueueSnackbar(res.msg,{
                    variant: 'error',
            });
        }

      });
    }
  }, [updateCount])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
        <TableContainer sx={{maxHeight: '100%'}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
            stickyHeader
            sx={{}}
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <EnhancedTableRow key={row.user_id} row={row} myPremissionLevel={myPremissionLevel} departmentId={departmentId} update={update} />
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalSize}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>

  );
}
