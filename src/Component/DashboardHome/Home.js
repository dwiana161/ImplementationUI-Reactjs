import React, { useState, useRef, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useStyles from './styles';
import Image from '../../Image/Group 20 (2) 1.png';
import Inform from './Inform';
import CarInfo from './CarInfo';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByCode, getLastLogWeigh, getAllData } from '../../actions/dashboard';

const mdTheme = createTheme();

function DashboardHome() {

  const [dataForm, setDataForm] = useState(false);
  const data = useSelector((state) => state.data);

  const classes = useStyles();
  const dispatch = useDispatch();


  const handleShowDataForm = () => setDataForm((prevDataForm) => !prevDataForm);


  return (
    <ThemeProvider theme={mdTheme}>
      <DataForm />

      <Grid container sx={{ mt:3, ml:1 }}> </Grid>

      <Grid container xs={12} md={12} lg={12} sx={{ display: 'flex', flexDirection: 'row'}}>
        {/* Inform */}
          <Grid item xs={6} md={6} lg={6} style={{paddingRight: '10px'}}>
              <Inform />
          </Grid>

        {/* CarInfo */}
          <Grid item xs={6} md={6} lg={6} style={{paddingLeft: '10px'}}>
             <CarInfo />
          </Grid>
      </Grid>
        {/* Table */}
        <Grid container xs={12} md={12} lg={12} sx={{mt:2}}>
            <Table />
        </Grid>
    </ThemeProvider>
  )
}

export default function Home() {
  return <DashboardHome />;
}
