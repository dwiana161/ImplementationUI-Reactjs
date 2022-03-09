import React, {useState, useEffect, useRef, useCallback, Item} from 'react';
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
import Container from '@mui/material/Container';
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
    console.log(rowsPerPage);
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Grid>
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
      {/*Overview*/}
      <Grid item xs={12}>
        <Box sx={{ width:'95%', height:'651px', ml:'auto', mr:'auto', border:'1px solid #ECECEC', borderRadius:'5px' }}>
          <Box variant="dense" className={classes.appbar} sx={{ maxWidth: '100vw', mb: 2 }}>
            <Typography sx={{ ml: 2 }} style={{ paddingTop:'6px', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px' }} variant="h6" color="white" component="div" >
              Overview
            </Typography>
          </Box>
          <Container maxWidth="100%">
          <Box style={{border:'1px solid #ECECEC', borderRadius:'5px', marginTop:'5vh', height:'370px'}}>
            <Grid item sx={{ml:4, mr:4, mt:4}}>
              <Typography style={{ fontFamily: 'Roboto', fontSize: '14px', color:'#494949'}}>Generator Name</Typography>
              <Typography style={{ marginTop:'2vh', fontFamily: 'Roboto', fontSize: '18px', color:'#494949', fontWeight:'bold'}}>Generator Premium 1</Typography>
              <Box sx={{ display:'flex', flexDirection:'row',  justifyContent: 'flex-end'}}>
                  <Box sx={{ display:'flex', flexDirection:'column', marginTop:'-7vh'}}>
                  <Typography style={{fontFamily:'Roboto', fontSize:'14px', lineHeight:'24px', letterSpacing:'0.15px', color:'#494949', textAlign:'right'}}>Start Date: <span style={{marginLeft:'1vw', fontWeight:'bold'}}> yyyy/dd/mm </span></Typography>
                  <Typography style={{fontFamily:'Roboto', fontSize:'14px', lineHeight:'24px', letterSpacing:'0.15px', color:'#494949', textAlign:'right', marginTop:'2vh'}}>End Date: <span style={{marginLeft:'1vw', fontWeight:'bold'}}> yyyy/dd/mm </span></Typography>
                  </Box>
                </Box>
                <Typography style={{ marginTop:'4vh', fontFamily: 'Roboto', fontSize: '14px', color:'#494949'}}>Generator Information</Typography>
                <Box sx={{ml:3}}>
                  <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Generator Type: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                  <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Series: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                  <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 1: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                  <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 2: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                </Box>
                  <Box sx={{ display:'flex', flexDirection:'row',  justifyContent: 'center'}}>
                    <Box sx={{ display:'flex', flexDirection:'column', mt:-24}}>
                    <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 3: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                    <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 4: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                    <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 5: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                    <Typography style={{ fontFamily:'Roboto', fontSize:'14px', marginTop:'24px', letterSpacing:'0.15px', color:'#C4C4C4'}}>Information 6: <span style={{fontWeight:'bold', color:'#494949', marginLeft:'1vw'}}>Type Text</span></Typography>
                    </Box>
                </Box>
            </Grid>
            </Box>
            <Box style={{border:'1px solid #ECECEC', borderRadius:'5px', marginTop:'2vh'}}>
            <Grid item sx={{ml:4}}>
                <Typography style={{ marginTop:'3vh', fontFamily: 'Roboto', fontSize: '14px', color:'#494949'}}>Total Rental Data</Typography>
                <Box sx={{ display:'flex', flexDirection:'row',  justifyContent: 'flex-start'}}>
                  <Typography style={{fontFamily:'Roboto', fontSize:'14px', lineHeight:'24px', color:'#C4C4C4', marginLeft:'3vw', marginTop:'3vh'}}>Total Rental Time</Typography>
                  <Typography style={{fontFamily:'Roboto', fontSize:'14px', lineHeight:'24px', color:'#C4C4C4', marginLeft:'10vw', marginTop:'3vh'}}>Total Rental Time</Typography>
                  <Typography style={{fontFamily:'Roboto', fontSize:'14px', lineHeight:'24px', color:'#C4C4C4', marginLeft:'10vw', marginTop:'3vh'}}>Total Rental Time</Typography>
                </Box>
                <Box sx={{ display:'flex', flexDirection:'row',  justifyContent: 'flex-start'}}>
                  <Typography style={{fontFamily:'Roboto', fontWeight:'bold',fontSize:'36px', color:'#494949', marginLeft:'3vw'}}>0</Typography>
                  <Typography style={{fontFamily:'Roboto', fontWeight:'bold', fontSize:'36px', color:'#494949', marginLeft:'14vw'}}>0</Typography>
                  <Typography style={{fontFamily:'Roboto', fontWeight:'bold', fontSize:'36px', color:'#494949', marginLeft:'15vw'}}>0 USD</Typography>
                </Box>
            </Grid>
            </Box>
          </Container>
        </Box>
      </Grid>
      <Box sx={{ width:'95%', height:'651px', mt:4, ml:'auto', mr:'auto', border:'1px solid #ECECEC', borderRadius:'5px' }}>
      <Box variant="dense" className={classes.appbar} sx={{ maxWidth: '100vw', mb: 2 }}>
        <Typography sx={{ ml: 2 }} style={{ paddingTop:'6px', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px' }} variant="h6" color="white" component="div" >
          Graph
        </Typography>
      </Box>
      </Box>
    </Grid>
  );
}
