import React, {useState, useEffect, useRef, useCallback, Item} from 'react';
import PropTypes from 'prop-types';
import { alpha, styled, useTheme } from '@mui/material/styles';
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
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Image from '../../Image/electric-generator 1.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import moment from 'moment';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import makeStyles from './styles';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from "material-ui-search-bar";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// Generate Order dateAdapter
function createData(name, location, status) {
  return { name, location, status };
}

const rows = [
  createData(
    'Generator Premium 1',
    'Daerah Istimewa Yogyakarta',
    'On',
  ),
  createData(
    'Generator Premium 1',
    'Daerah Istimewa Yogyakarta',
    'On',
  ),
  createData(
    'Generator Premium 1',
    'Daerah Istimewa Yogyakarta',
    'On',
  ),
  createData(
    'Generator Premium 1',
    'Daerah Istimewa Yogyakarta',
    'On',
  )
]

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'generatorName',
    numeric: false,
    disablePadding: true,
    label: 'Generator Name',
  },
  {
    id: 'location',
    numeric: true,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    disablePadding: false,
    label: 'Action',
  },
];

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    const classes = makeStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor:'#33518A', color:'#B5CBF4', fontWeight:'bold', fontSize:'14px', fontFamily:'Roboto'}}
          >
            <TableSortLabel
              className={classes.tableText}
              sx={{  color: '#5D7078'}}
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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {

  const dispatch = useDispatch();
  const location = useLocation();
  const classes = makeStyles();

  const theme = useTheme();
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('loc_code');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [minDateStart, setMinDateStart] = useState(null);
  const [searched, setSearched] = useState("");
  const [site, setSite] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [noLambung, setNoLambung] = useState(null);
  const [ auth, setAuth ] = useState(decodeURI(cookies.get('access_token')));
  const [ userId, setUserId ] = useState(decodeURI(cookies.get('user_id')));
  const [downloaded, setDownloaded] = useState(false);
  const [addDays, setAddDays] = useState(false);
  const timer = useRef();
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    console.log(rowsPerPage);
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>

    <Box>
      {/*filter dan icon diatas*/}
      <Box sx={{ flexGrow: 1, width:'95%', ml:'auto', mr:'auto' }}>
        <Grid container spacing={2} sx={{mt:0.05}}>

          {/* Filter Generator */}
          <Grid item xs={6} lg={4}>
            <TextField
              sx={{width:'100%', backgroundColor: '#FFFFFF'}}
              select
              type="text"
              value={site}
              name="generator"
              onChange={(e) => setSite(e.target.value)}
              id="generator"
              label="Generator Name"
              autoComplete="generator"
            >
            </TextField>
          </Grid>

          {/* Filter Report Data */}
          <Grid item xs={6} lg={4}>
            <TextField
              sx={{width:'100%', backgroundColor: '#FFFFFF'}}
              select
              type="text"
              value={scanner}
              name="report"
              onChange={(e) => setScanner(e.target.value)}
              id="report"
              label="Report Data"
              autoComplete="report"
            >
            </TextField>
          </Grid>

          {/* Filter Date */}
          <Grid item xs={6} lg={4}>
            <Grid container spacing={2}>
              {/* Start Date */}
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                  label="Start Date"
                  inputFormat="yyyy-MM-dd"
                  value={dateStart}
                  disableFuture
                  onChange={(newValue) => {
                        setDateStart(moment(newValue).format('yyyy-MM-DD'));
                        setMinDateStart(newValue);
                        }}
                  renderInput={(params) => <TextField {...params} sx={{bgcolor:'#FFFFFF',  width:'100%'}}/>}
                  />
                </LocalizationProvider>
              </Grid>
              {/* End Date */}
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="yyyy-MM-dd"
                    value={dateEnd}
                    disableFuture
                    minDate={minDateStart}
                    onChange={(newValue) => {
                          setDateEnd(moment(newValue).format('yyyy-MM-DD'));
                          }}
                    renderInput={(params) => <TextField {...params} sx={{bgcolor:'#FFFFFF', width:'100%'}}/>}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <br></br>
      {/*Table*/}
      <Grid item xs={12}>
        <Box sx={{ width:'95%', ml:'auto', mr:'auto' }}>
          <Paper sx={{ maxWidth: '100vw', mb: 2 }}>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size='small'
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount=''
                />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                            <TableRow>
                              <TableCell style={{fontFamily: 'Noto Sans', fontSize:'14px'}}><img src={Image} align="left" style={{marginLeft:'25px', marginRight:'25px'}} alt="image"/>{row.name}</TableCell>
                              <TableCell style={{fontFamily: 'Noto Sans', fontSize:'14px'}}>{row.location}</TableCell>
                              <TableCell>
                                <Typography
                                  style={{
                                      fontFamily: 'Roboto',
                                      fontSize:'14px',
                                      backgroundColor: row.status === 'On' ? '#F1F8E9' : '#FBE9E7',
                                      color: row.status === 'On' ? '#8BC34A' : '#E64A19',
                                      width: '71px',
                                      height: '30px',
                                      textAlign:'center',
                                      borderRadius: '110px',
                                      fontWeight:'bold',
                                    }}
                                >
                                  {row.status}
                                </Typography>
                              </TableCell>
                              <TableCell style={{fontFamily: 'Noto Sans', fontSize:'14px'}}>
                                <Button
                                  onClick={handleDrawerOpen}
                                  style={{
                                    width:'9vw',
                                    height:'34px',
                                    backgroundColor:'#3B79D7',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'10px'
                                  }}>View Detail</Button>
                              </TableCell>
                            </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Grid>
    </Box>

</div>
  );
}
