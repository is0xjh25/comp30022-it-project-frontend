// Reference: https://material-ui.com/components/tables/#sorting-amp-selecting
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Mail from '@material-ui/icons/MailOutline';
import EditPermission from '@material-ui/icons/Person';
import { getAllUsers, changePermission, acceptUser, deleteUser, declineUser } from '../../api/Manage';
import AlertDialog from '../Dialog/AlertDialog';
import SelectDialog from '../Dialog/SelectDialog';



// function createData(name, email, authorityLevel, recentActivity) {

//   const manage = authorityLevel === 0 ? 0 : 6 - authorityLevel;
//   return { name, email, authorityLevel, recentActivity, manage };
// }



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
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


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

const permissionLevels = [
  'Pending to join',
  'Member',
  'Department admin',
  'Department admin',
  'Department admin',
  'Organization Owner'
]

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
  useEffect(function fetchTableData() {
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
        }

      });
    }
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  //================ Alert Dialog ==================
  const [alertTitle, setAlertTitle] = useState('Delete Confirm')
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [handleConfirm, setHandleConfirm] = useState(() => () => {});


  //================ Select Dialog ==================
  const items = permissionLevels.map((item, index) => {
    return {value: index, name: item}
  });
  var currentSelect;
  const [selectOpen, setSelectOpen] = useState(true);
  const [selectChange, setSelectChange] = useState(() => () => {});
  const [selectClose, setSelectClose] = useState(() => () => {});
  const [selectConfirm, setSelectConfirm] = useState(() => () => {});





  return (
    <div className={classes.root}>
      <AlertDialog alertTitle={alertTitle}
        alertMessage={alertMessage}
        open={alertOpen}
        handleClose={() => { setAlertOpen(false) }}
        handleConfirm={handleConfirm}
        handleCancel={() => { setAlertOpen(false) }} />

      <SelectDialog
        items={items}
        currentSelected={currentSelect}
        title="Change the role of this member"
        label="Role"
        open={selectOpen}
        handlleChange={selectChange}
        handleClose={selectClose}
        handleConfirm={selectConfirm}
      />
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (row.permissionLevel < 0) {
                    return;
                  }
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const handleDelete = () => {
                    setAlertOpen(true);
                    setAlertMessage('Do you want to kick ' + row.name + '?');
                    setHandleConfirm(() => () => {
                      deleteUser(row.userId, departmentId);
                      alert(row.name + 'is kicked!');
                      setAlertOpen(false);
                    });
                  }

                  const handleAccept = () => {
                    acceptUser(row.userId, departmentId);
                    alert(row.name + 'is accepted');
                    row.permissionLevel = 1;
                  }

                  const handleDecline = () => {
                    declineUser(row.userId, departmentId);
                    alert(row.name + 'is declined');
                    row.authorityLevel = -1;
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
                        <IconButton>
                          <EditPermission />
                        </IconButton>
                        <IconButton>
                          <Mail />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
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
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.userId}
                    >
                      <TableCell padding="normal">
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{permissionLevels[row.authorityLevel]}</TableCell>
                      <TableCell align="center">{row.recentActivity}</TableCell>
                      <TableCell align="center">
                        {manage}
                      </TableCell>
                    </TableRow>
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
          rowsPerPageOptions={[5, 10, 25]}
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
