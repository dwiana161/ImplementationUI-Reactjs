import React, {useState, useEffect, useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getDataTrigger } from '../../actions/dashboard';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Inform() {

  const classes = makeStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const informUser = useSelector((state) => state.data);
  console.log(informUser);
  const [auth, setAuth] = useState(decodeURI(cookies.get('access_token')));

  useEffect(() => {
		dispatch(getDataTrigger(auth));
    console.log(informUser);
	}, [])

  return (
    <Box className={classes.box}>
      <Box variant="dense" className={classes.appbar}>
        <Typography sx={{ ml: 2 }} style={{ paddingTop:'2px', fontFamily: 'Noto Sans', fontWeight: 'bold', fontSize: '18px' }} variant="h6" color="white" component="div" >
          INFORMASI
        </Typography>
      </Box>

      <Container component="form" noValidate className={classes.boxForm}>
        <div className={classes.informasi}>
          <TextField
            fullWidth
            label={!informUser.dataInform.length? '-' : informUser.dataInform.map((inform)=> (inform.vin)) }
            autoFocus
            disabled={true}
          />
          <TextField
            fullWidth
            label={!informUser.dataInform.length? '-' : informUser.dataInform.map((inform)=> (inform.jenis_muatan)) }
            autoFocus
            disabled={true}
            sx={{mt:6}}
          />
          <TextField
            fullWidth
            label={!informUser.dataInform.length? '-' : informUser.dataInform.map((inform)=> (inform.asal_muatan)) }
            autoFocus
            disabled={true}
            sx={{mt:6}}
          />
        </div>
      </Container>
    </Box>
  )
}
