import React, {useState, useEffect, useRef, useCallback } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MonitorIcon from '@mui/icons-material/Monitor';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../Image/avatar with man in green shirt and orange hat.png';
import useStyles from './styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [ typeButton, setTypeButton ] = useState('monitoring');
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl)

  const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      console.log(typeButton);
    })

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  const handleItemClick = (event, newType) => {
    setTypeButton(newType);
    if(newType === 'monitoring')
    {
      navigate('/')
    }
    else if(newType === 'report')
    {
      navigate('report')
    } else if(newType === 'geofence') {
      navigate('geofence')
    }
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" style={{backgroundColor:'#FFFFFF'}}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              style={{color:"#3B79D7"}}
              onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
             id="basic-menu"
             anchorEl={anchorEl}
             open={open}
             onClose={handleClose}
             MenuListProps={{
               'aria-labelledby': 'basic-button',
             }}
           >
             <MenuItem style={{width:'20vw', height:'155px'}} onClick=''>
              <Grid item sx={{ display:'flex', flexDirection:'row', ml:2, mt:-6}}>
              <img src={Avatar} sx={{ mt:-2, width:'60px', height:'60px', color: '#C4C4C4'}} alt="image"/>
                <Typography sx={{ml:1.5}} style={{fontWeight: 'bold', fontSize: '18px', color: '#5D7078'}}>Admin 1</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{mt:-1, ml:-9}} style={{fontWeight: 'normal', fontSize: '12px', color: '#5D7078'}}>PROJECT MANAJER</Typography>
              </Grid>
              <Grid item sx={{mt:3, ml:-23}}>
                  <Button variant="outlined" color="error" sx={{mt:8}} style={{width:'18vw', fontSize:'14px', fontFamily: 'Noto Sans', fontWeight:'bold' }}>Log Out</Button>
              </Grid>
             </MenuItem>
           </Menu>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container style={{maxWidth:'100vw'}} sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box style={{width:'6vw', height:'50px',paddingLeft:'1.5vw', paddingTop:'0.5vw', borderRadius:'5px 0px 0px 5px', fontSize: '20px', backgroundColor:'#E64A19', color: '#FFFFFF', fontFamily: 'Noto Sans', fontWeight: 'bold' }}>Off</Box>
                  <Box style={{width:'100%', backgroundColor:'#FBE9E7'}}>
                    <Typography style={{paddingLeft:'50%', paddingTop:'0.5vw', color:'#494949', fontFamily: 'Noto Sans', fontWeight: 'bold'}}>3</Typography>
                  </Box>
                </Grid>
                <Grid item sx={{display: 'flex', flexDirection: 'row', mt:2}}>
                  <Box style={{width:'6vw', height:'50px',paddingLeft:'1.5vw', paddingTop:'0.5vw', borderRadius:'5px 0px 0px 5px', fontSize: '20px',backgroundColor:'#FDCB3E', color: '#FFFFFF', fontFamily: 'Noto Sans', fontWeight: 'bold' }}>IDLE</Box>
                  <Box style={{width:'100%', backgroundColor:'#FFF7E2'}}>
                    <Typography style={{paddingLeft:'50%', paddingTop:'0.5vw', color:'#494949', fontFamily: 'Noto Sans', fontWeight: 'bold'}}>0</Typography>
                  </Box>
                </Grid>
                <Grid item sx={{display: 'flex', flexDirection: 'row', mt:2}}>
                  <Box style={{width:'6vw', height:'50px',paddingLeft:'1.5vw', paddingTop:'0.5vw', borderRadius:'5px 0px 0px 5px', fontSize: '20px',backgroundColor:'#8BC34A', color: '#FFFFFF', fontFamily: 'Noto Sans', fontWeight: 'bold' }}>ON</Box>
                  <Box style={{width:'100%', backgroundColor:'#F1F8E9'}}>
                    <Typography style={{paddingLeft:'50%', paddingTop:'0.5vw', color:'#494949', fontFamily: 'Noto Sans', fontWeight: 'bold'}}>7</Typography>
                  </Box>
                </Grid>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                  <Typography style={{  fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '18px', color: '#494949',}}>{typeButton ==='monitoring'? 'Monitoring' : typeButton === 'report'? 'Report' : 'Geofence'}</Typography>
                    <Grid item justifyContent="flex-end" xs={12} lg={12} sx={{display: 'flex', flexDirection: 'row', mr:2 }}>
                      <ToggleButtonGroup
        								value={typeButton}
        								exclusive
        								onChange={handleItemClick}
        							>
                        <ToggleButton
                          value="monitoring"
                          sx={{mr:2}}
                          style={{
                            width: '10vw',
                            height: '36px',
                            borderRadius: '5px',
                            border:'0px',
                            backgroundColor: typeButton === "monitoring" ? '#FFC061' : '#F3F3F3',
                          }}>
                          <MonitorIcon sx={{ml:-2, mr:1}} style={{color: typeButton === "monitoring" ? '#FFFFFF' : '#494949'}}/>
                          <Typography style={{
                            width:'60px',
                            height:'14px',
                            fontFamily:'Roboto',
                            fontWeight:'bold',
                            fontSize:'12px',
                            color: typeButton === "monitoring" ? '#FFFFFF' : '#494949',
                          }}>
                              Monitoring
                            </Typography>
                          </ToggleButton>
                          <ToggleButton
                          value="report"
                          sx={{mr:2}}
                          style={{
                            width: '111px',
                            height: '36px',
                            borderRadius: '5px',
                            border:'0px',
                            backgroundColor: typeButton === "report" ? '#FFC061' : '#F3F3F3',
                          }}>
                          <TableChartIcon style={{color: typeButton === "report" ? '#FFFFFF' : '#494949'}}/>
                            <Typography style={{
                              width:'60px',
                              height:'14px',
                              fontFamily:'Roboto',
                              fontWeight:'bold',
                              fontSize:'12px',
                              color: typeButton === "report" ? '#FFFFFF' : '#494949',
                            }}>
                                Report
                              </Typography>
                            </ToggleButton>
                            <ToggleButton
                            value="geofence"
                            style={{
                              width: '111px',
                              height: '36px',
                              borderRadius: '5px',
                              border:'0px',
                              backgroundColor: typeButton === "geofence" ? '#FFC061' : '#F3F3F3',
                            }}>

                              <Typography style={{
                                width:'60px',
                                height:'14px',
                                fontFamily:'Roboto',
                                fontWeight:'bold',
                                fontSize:'12px',
                                color: typeButton === "geofence" ? '#FFFFFF' : '#494949'
                              }}>
                                  Geofence
                                </Typography>
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                </Paper>
                <Grid item xs={12}>
                <Paper sx={{mt:1}}>
                  <Outlet />
                </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
