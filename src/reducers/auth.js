import { AUTH, LOGOUT } from '../constants/actionTypes';
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
const cookies = new Cookies();
const cookiez = new Cookies();
console.log(cookies);


const initialState = {
  token: null,
  loading: true,
  error: '',
}

export default (authData = initialState, action) =>
{
  switch(action.type){
    case AUTH:
    cookies.set('access_token', JSON.stringify(action?.data), {path: '/', maxAge: 3600});
    cookiez.set('user_id', JSON.stringify(action?.id), {path: '/', maxAge: 3600});
    return {...authData,
            loading:false,
            token: action?.data,
          };
    case LOGOUT:
    localStorage.clear();
    return {...authData,
            loading:false,
            token: null};
    default:
      return authData;
  }
}
