import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const loginUser = (loginData, navigate) => async(dispatch) => {
  try {
    const { data } = await api.loginUser(loginData);

    console.log(data);

    dispatch({ type: AUTH, data });
    navigate('/dashboard/home')
  } catch (error) {
    console.log(error);
  }
}
