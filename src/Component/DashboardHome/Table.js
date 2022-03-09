import React, {useState, useEffect, useRef} from 'react';
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
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from './styles';
import Cookies from 'universal-cookie';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { getLastLogWeigh, getAllData } from '../../actions/dashboard';
import CircularProgress from '@mui/material/CircularProgress';

const cookies = new Cookies();

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
	const stabilizedThis = array.map((el, index) => [ el, index ]);
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
		id: 'no',
		disablePadding: false,
		label: 'NO'
	},
	{
		id: 'created',
		disablePadding: false,
		label: 'TIMESTAMP'
	},
	{
		id: 'vin',
		disablePadding: false,
		label: 'PLAT NOMOR'
	},
	{
		id: 'jenis_muatan',
		disablePadding: false,
		label: 'JENIS MUATAN'
	},
	{
		id: 'asal_muatan',
		disablePadding: false,
		label: 'ASAL MUATAN'
	},
	{
		id: 'berat_muatan',
		disablePadding: false,
		label: 'BERAT MUATAN'
	},
	{
		id: 'status',
		disablePadding: false,
		label: 'JENIS'
	}
];

function EnhancedTableHead(props) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
						className={classes.tableText}
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
	order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
	const classes = makeStyles();

	const { numSelected } = props;

	return (
		<Box
			sx={{
				backgroundColor: '#37474F',
				color: '#FFFFFF',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				borderRadius: '5px 5px 0px 0px',
				padding:'3px',
				height:'36px'
			}}
		>
			<Typography
				sx={{ ml: 2 }}
				style={{ fontFamily: 'Noto Sans', fontWeight: 'bold', fontSize: '18px' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				TABEL DATA KENDARAAN
			</Typography>
		</Box>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {

	const dispatch = useDispatch();

	const [ order, setOrder ] = useState('desc');
	const [ orderBy, setOrderBy ] = useState('created');
	const [ selected, setSelected ] = useState([]);
	const [loading, setLoading] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ dense, setDense ] = useState(false);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const dataUser = useSelector((state) => state.data);
	const timer = useRef();
	console.log(dataUser)
	const [auth, setAuth] = useState(decodeURI(cookies.get('access_token')));

	const classes = makeStyles();

	useEffect(() => {
		dispatch(getLastLogWeigh(auth));
		dispatch(getAllData(auth));
		console.log(dataUser.dataManual);
	}, [])

	timer.current = window.setTimeout(() => {
	        setLoading(false);
	    }, 1500);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = dataUser.dataList.map((n) => n.name);
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
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataUser.dataList.length) : 0;

	return (
	<Grid container spacing={3}>
	<Grid item xs={12}>
	<Box sx={{ width:'100%' }}>
		<Paper sx={{ maxWidth: '100vw', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={dataUser.dataList.length}
						/>
						{
							!dataUser.dataList.length ?
							<div>
							{ loading ?
								<div>
									<CircularProgress color="inherit" size={30}/>
								</div>
							:
								<Typography sx={{ml:2}} style={{fontFamily: 'Noto Sans', fontSize:'14px'}} > Data tidak ditemukan </Typography>
							}
							</div>
						:
							<TableBody>
								{stableSort(dataUser.dataList, getComparator(order, orderBy))
									.map((list, index) => (
											<TableRow key={list.log_id} className={classes.textRow}>
												<TableCell>{(page*rowsPerPage)+index + 1}</TableCell>
												<TableCell>{list.created}</TableCell>
												<TableCell>{list.vin}</TableCell>
												<TableCell>{list.jenis_muatan}</TableCell>
												<TableCell>{list.asal_muatan}</TableCell>
												<TableCell>{list.berat_muatan}</TableCell>
												<TableCell>{list.status}</TableCell>
											</TableRow>
								))}
						</TableBody>
					}
					</Table>
				</TableContainer>
</Paper>
</Box>
</Grid>
	</Grid>
	);
}
