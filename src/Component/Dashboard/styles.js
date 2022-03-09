import { makeStyles } from  '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    width: '90vw',
  },
  appbar:{
    borderTopRightRadius: '5px',
    borderTopLeftRadius: '5px',
    background: '#33518A',
    // width:'44vw',
    height: '36px',
  },
  informasi: {
    justifyContent:'center',
    alignItems:'center',
    // background: 'red',
    height:'375px', // 421 - 46
    padding: '55px 5px 55px 5px',
    // borderRadius:'4px',
  },
}));
