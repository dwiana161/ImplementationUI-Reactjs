import { makeStyles } from  '@mui/styles';

export default makeStyles((theme) => ({
  container:{
    maxWidth:'100vw',
  },
  box:{
    height: '421px',
    width: '100%',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.14)',
    borderRadius: '5px',
    background:'#FFFFFF',
  },
  boxForm:{
    height:'56px',
    boxSizing: 'borderBox',
    zIndex: '0',
    justifyContent:'center',
    alignItems:'center',
  },
  select:{
    width:'100%',
    // left:'10px',
    // top:'5px',
    border: '1px solid #C4C4C4',
    boxSizing: 'borderBox',
    borderRadius: '3px',
    zIndex: 0,
  },
  appbar:{
    borderTopRightRadius: '3px',
    borderTopLeftRadius: '3px',
    background: '#37474F',
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
  btn:{
    width:'100%',
    borderRadius:'4px',
    height:'54px',
    // left:'25px',
    // top: '-5px',
  },
  text:{
    // width:'129px',
    // height:'87px',
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    fontSize: '64px',
    // lineHeight: '87px',
    letterSpacing: '0.15px',
    color: '#5B5B5B',
  },
  textKG:{
    // width:'129px',
    // height:'87px',
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    fontSize: '64px',
    // lineHeight: '87px',
    letterSpacing: '0.15px',
    color: '#5B5B5B',
  },
  tHead:{
    lineHeight:'24px',
    letterSpacing:'0.15px',
    color: 'rgba(69, 90, 100, 0.87)',
    width: '19.5vw',
    height: '45px'
  },
  tBody:{
    lineHeight:'143%',
    letterSpacing:'0.15px',
    color: 'rgba(66, 66, 66, 0.87)',
    width: '19.5vw',
    height: '57px'
  },
  boxContainer:{
    height: '421px',
    width: '100%',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.14)',
    borderRadius: '5px',
    background:'#FFFFFF',
  },
  image:{
    left:'5.97%',
    right:'76.29%',
    top:'20.27%',
    bottom:'-3.42%',
  },
  title: {
    fontFamily: 'Noto Sans sans-serif',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  date: {
    lineHeight:'28px',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform:'uppercase',
  },
  textBtn: {
    height: '32px',
    left:'6px',
    right: '8px',
    // top: 'calc(50% - 32px/2)',
    fontFamily: 'Roboto',
    fontWeight:'500',
    fontSize:'14px',
    lineHeight:'16px',
    textAlign:'center',
    letterSpacing:'1.25px',
    textTransform: 'uppercase',
  },
  btnInput: {
    justifyContent:'center',
    alignItems:'center',
    // width:'199px',
    height:'60px',
    // top:'-70px',
    borderRadius:'4px'
  },
  circleRed: {
    color:'#F84646',
    boxSizing: 'borderBox',
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleGreen: {
    color:'#59E517',
    boxSizing: 'borderBox',
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableText: {
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  tableRow: {
    fontFamily: 'Noto Sans',
    fontSize: '14px',
  },
}));
