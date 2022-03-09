import React, {useState, useEffect, useRef} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import makeStyles from './styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { getDataTrigger, getAllPort, getCheckPort } from '../../actions/dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CONNECT_PORT_SUCCESS } from '../../constants/actionTypes';
import Cookies from 'universal-cookie';
import CircularProgress from '@mui/material/CircularProgress';
const cookies = new Cookies();

export default function CarInfo() {

  const classes = makeStyles();

  const [currencyPort, setCurrencyPort] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const info = useSelector((state) => state.data);
  const [auth, setAuth] = useState(decodeURI(cookies.get('access_token')));
  const timer = useRef();
  console.log(info.checkPort);

  useEffect(() => {
    dispatch(getAllPort(auth));
    dispatch(getCheckPort(auth));
    const interval = setInterval(() => {
    dispatch(getDataTrigger(auth));
  }, 1500);
  return () => clearInterval(interval);
	}, [])

  timer.current = window.setTimeout(() => {
	        setLoading(false);
	    }, 1500);

  const handleChange = (event) => {
    setCurrencyPort(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await axios({
			method: 'post',
			url: 'http://localhost:5005/api/dashboard/port',
			withCredentials: false,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'application/json',
				Accept: '*/*',
        token: auth
			},
			data: {
				port: currencyPort,
			}
		});

		const json = await resp;
		console.log(json.data);
    const data= json.data

    if (data) {
			dispatch({ type: CONNECT_PORT_SUCCESS, data });
      dispatch(getCheckPort(auth));
      navigate('/dashboard/home');
		} else {
			console.log('error');
		}
  };

console.log(info.dataInform.length);

  return (
    <div>
        <Box className={classes.box}>
          <Grid container xs={12} md={12} lg={12} sx={{ display:'flex', flexDirection:'row', alignItems:'flex-start', padding: '16px 14px 16px 14px' }}>
            {/* Select Device */}
            <Grid item xs={8} md={8} lg={8} sx={{paddingLeft: '10px', paddingRight: '10px'}}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="port"
                value={currencyPort}
                onChange={handleChange}
                className={classes.select}
              >
                {info.dataPort.map((port) => (
                  <MenuItem key={port.path} value={port.path}>
                    {port.path}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Tombol Connect */}
            <Grid item xs={3} md={3} lg={3} sx={{paddingLeft: '10px', paddingRight: '10px'}}>
              {
                info.checkPort !== '0' && info.checkPort !== null?
                  <Button variant="contained" color="success" onClick={handleSubmit} className={classes.btn} style={{ backgroundColor: '#59E517[500]', '&:hover': {backgroundColor: '#59E517[700]'} }}>CONNECTED</Button>
                :
                  <Button variant="contained" color="error" onClick={handleSubmit} className={classes.btn} style={{ backgroundColor: '#F84646[500]', '&:hover': {backgroundColor: '#F84646[700]'} }}>CONNECT</Button>
              }
            </Grid>

            {/* Circle Indicator */}
            <Grid item xs={1} md={1} lg={1}>
              <Container style={{height: '54px',  padding: '22%'}}>
                {
                  info.checkPort !== '0' && info.checkPort !== null?
                    <CircleIcon className={classes.circleGreen}/>
                  :
                    <CircleIcon className={classes.circleRed}/>

                }
              </Container>
            </Grid>

          </Grid>
          <Divider />

          {/* Hasil Timbang */}
          <Box
              sx={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor:'#C4C4C4',
                width:'94%',
                height:'160px',
                display:'flex',
                flexDirection:'row',
                margin: '3%',
                borderRadius: '5px',
                padding: '10px'
              }}
          >
            <Container>
              {/* berat timbangan */}
              <Grid item lg={12} md={12} xs={12}>
              <Typography style={{fontFamily:'Noto Sans'}} sx={{ml:-2}}><b>Berat Muatan</b></Typography>
                <Typography
                  sx={{textAlign:'center', width: '100%'}}
                  style={{
                    fontFamily:'Audiowide',
                    fontWeight:'bold',
                    fontSize:'70px',
                    letterSpacing:'10px',
                    textAlign: 'center',
                    color:'#519259',
                  }}
                  >
                  {info.dataInform.length === 0 ? '0' : info.dataInform.map((inform)=> (inform.total_weight)) }

                </Typography>
              </Grid>

              {/* tulisan KG */}
              <Grid item lg={12} md={12} xs={12}>
                <Typography
                  color="text.secondary"
                  sx={{mt:-2}}
                  style={{
                    fontFamily:'Noto Sans',
                    fontWeight:'bold',
                    fontSize:'24px',
                    letterSpacing:'0.15px',
                    color:'#5B5B5B',
                    textAlign: 'right',
                  }}
                  >KG
                </Typography>
              </Grid>

            </Container>
          </Box>

          {/* tabel rincian hasil timbangan */}
          <Grid item sx={{ml:3}} style={{ display:'flex', flexDirection:'row' }}>
            <Box className={classes.tHead}
            style={{borderRadius:'5px 0px 0px 0px',
            borderTop: '1px solid #C4C4C4',
            borderLeft: '1px solid #C4C4C4',
          }}>
            <Typography
            sx={{ml:2, mt:1}}
              style={{
                fontFamily:'Noto Sans',
                fontStyle:'normal',
                fontWeight:'bold',
                fontSize:'14px',
              }}
            >
              <b>Berat Kendaraan </b>
            </Typography>
            </Box>
            <Box className={classes.tHead}
            style={{borderRadius:'0px 5px 0px 0px',
                    borderTop: '1px solid #C4C4C4',
                    borderLeft: '1px solid #C4C4C4',
                    borderRight: '1px solid #C4C4C4',}}>
            <Typography
            sx={{ml:2, mt:1}}
              style={{
                fontFamily:'Noto Sans',
                fontStyle:'normal',
                fontWeight:'bold',
                fontSize:'14px',
              }}
            >
              <b>Total Berat </b>
            </Typography>
            </Box>
          </Grid>
          <Grid item sx={{ml:3}} style={{ display:'flex', flexDirection:'row' }}>
            <Box sx={{mt:0.08}} className={classes.tBody}
                style={{borderRadius:'0px 0px 0px 5px',
                      borderTop: '1px solid #C4C4C4',
                      borderLeft: '1px solid #C4C4C4',
                      borderRight: '1px solid #C4C4C4',
                      borderBottom: '1px solid #C4C4C4'}}>
            <Typography
            sx={{ml:2, mt:2}}
              style={{
                fontFamily:'Noto Sans',
                fontStyle:'normal',
                fontWeight:'bold',
                fontSize:'14px',
              }}
            >
              {info.dataInform.length === 0 ? '0' : info.dataInform.map((inform)=> (inform.total_vehicle)) }
                <span sx={{ml:'10'}}>KG</span>
              </Typography>
            </Box>
            <Box className={classes.tBody}
            style={{borderRadius:'0px 0px 5px 0px',
                    borderTop: '1px solid #C4C4C4',
                    borderRight: '1px solid #C4C4C4',
                    borderBottom: '1px solid #C4C4C4'
          }}>
            <Typography
            sx={{ml:2, mt:2}}
              style={{
                fontFamily:'Noto Sans',
                fontStyle:'normal',
                fontWeight:'bold',
                fontSize:'14px',
              }}
            >
              {info.dataInform.length === 0 ? '0' : info.dataInform.map((inform)=> (inform.total_timbang)) }
              <span sx={{ml:'10'}}>KG</span>
            </Typography>
            </Box>
          </Grid>
      </Box>
    </div>
  )
}
