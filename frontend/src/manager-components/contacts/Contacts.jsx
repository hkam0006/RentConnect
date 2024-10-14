import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetContactsByID from '../../queries/Contact/useGetContactsByID';

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

const headCells = [
  {
    id: 'name',
    sortable: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'phone_number',
    sortable: true,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'email',
    sortable: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'last_contact',
    sortable: true,
    disablePadding: false,
    label: 'Last Contact',
  },
  {
    id: 'message',
    sortable: false,
    disablePadding: false,
    label: 'Message',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.sortable ? 'left' : 'right'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Contacts() {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [userID, setUserID] = useState(null)
  const [contacts, setContacts] = useState([])
  const fetchContacts = useGetContactsByID(userID)

  const navigate = useNavigate();

  useEffect(() => {
    setContacts(fetchContacts)
  }, [fetchContacts])
  
  useEffect(() => {
    async function getUserID() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error fetching user:", error.message)
      } else if (data?.user) {
        setUserID(data.user.id)
      }
    }
    getUserID()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () =>
      stableSort(contacts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [contacts, order, orderBy, page, rowsPerPage],
  );

  return (
    <NavigationMenu>
    <Box sx={{ width: '100%', flexDirection: 'column'}}>
        
        <br/><br/><br/><br/>
      <Paper sx={{ width: '95%', mb: 2 , marginLeft: "2.5%"}}>
          <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={contacts.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(contacts.id);
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        <Link href="#" to={`/Rprofile/${row.id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.phone_number}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        {new Date(row.last_contact).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                    <TableCell align="right"><Button variant="contained" disableElevation onClick={() => navigate(`/messages/${row.id}`)}>Message</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </NavigationMenu>
  );
}

export default Contacts;