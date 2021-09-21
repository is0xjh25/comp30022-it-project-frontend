// Reference: https://material-ui.com/components/tables/#sorting-amp-selecting
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Mail from '@material-ui/icons/MailOutline';
import EditPermission from '@material-ui/icons/Person';
import { getAllUsers, changePermission, acceptUser, deleteUser, declineUser } from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';
import SelectDialog from '../Dialog/SelectDialog';







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

// Each row of the table, containing states about popups
function EnhancedTableRow(props) {
  const {row, currentUser, departmentId, update} = props;
  //================ Delete Member ==================

  const [alertOpen, setAlertOpen] = useState(false);
  const alertTitle = 'Delete Confirm';
  const alertMessage = `Do you want to delete ${row.name}?`;
  const handleDeleteMember = function() {
    setAlertOpen(true);
  }
  const handleAlertConfirm = function() {
    deleteUser(row.userId, departmentId);
    alert(`${row.name} is deleted`);
    setAlertOpen(false);
    update();
  }


  //================ Change permission level ==================
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(-1);
  
  const selectItems = permissionLevels
  .filter((item) => {
    return (item.authorityLevel !== 0) && (item.authorityLevel < currentUser.authorityLevel);
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
    console.log(event.target.value);
    setCurrentSelected(Number(event.target.value) || -1);
  }
  const handleChangeRole = function() {
    setSelectOpen(true);
  }
  const handleSelectConfirm = function() {
    if(currentSelected && currentSelected > 0) { // -1 and 0 are not valid
      alert(`${row.userId} is now assigned to ${permissionLevelMap[currentSelected]}`);
      changePermission(row.userId, currentSelected, departmentId);
      setSelectOpen(false);
      setCurrentSelected(-1);
    } else {
      alert('Select a valid role!');
    }
    update();
  }

  const handleAccept = function() {
    acceptUser(row.userId, departmentId);
    update();
  }

  const handleDecline = function() {
    declineUser(row.userId, departmentId);
    update();
  }

  var manage;
  if (row.authorityLevel === 0) {
    manage = (
      <div>
        <Button variant='contained' onClick={handleAccept}>
          Accept
        </Button>
        <Button variant='outlined' onClick={handleDecline}>
          Decline
        </Button>
      </div>)
  } else if (currentUser && currentUser.authorityLevel > row.authorityLevel) {
    manage = (
      <div>
        <IconButton onClick={handleChangeRole}>
          <EditPermission />
        </IconButton>
        <IconButton>
          <Mail />
        </IconButton>
        <IconButton onClick={handleDeleteMember}>
          <Delete />
        </IconButton>
      </div>
    )
  } else {
    manage = (
      <div>
        <IconButton>
          <Mail />
        </IconButton>
      </div>
    )
  }


  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.userId}
    >
      
      <TableCell padding="normal">
        <Avatar>
          <ImageIcon />
        </Avatar>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{permissionLevelMap[row.authorityLevel]}</TableCell>
      <TableCell align="center">{row.recentActivity}</TableCell>
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
  //================ Data from parent ==================
  const currentUser = props.currentUser;
  const departmentId = props.departmentId

  //================ Table settings ==================
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('manage');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);

  const update = function() {
    setTimeout(() => {setUpdateCount(updateCount+1);}, 1000);
  }

  useEffect(function fetchTableData() {
    console.log(updateCount)
    if (departmentId) {
      getAllUsers(departmentId, 1).then(res => {
        console.log(res);
        if (res.code == 200) {
          const data = res.data
          const records = data.records
          records.forEach(row => {
            row.name = row.firstName + ' ' + row.lastName
          });
          console.log(records);
          setRows(records);
        }else {
          console.log('Failed to fetch table data, using mock data')
          const records = [
            {name: 'Yiyang Huang', userId: 100, email:'abc', authorityLevel: 5},
            {name: 'regular member', userId: 101, email: 'def', authorityLevel: 1}
          ]
          setRows(records)
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
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
                    <EnhancedTableRow key={row.userId} row={row} currentUser={currentUser} departmentId={departmentId} update={update} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  );
}
