import {
  CREATE,
  GET_ALLDATA_SUCCESS,
  GET_DATAPORT_SUCCESS,
  GET_DATAWEIGH_SUCCESS,
  GET_DATAINFORM_SUCCESS,
  GET_DATA_TRIGGER_SUCCESS,
  GET_CHECKPORT_SUCCESS,
} from '../constants/actionTypes';
import * as api from '../api';

export const getDataByCode = (auth) => async (dispatch) => {
  try{
    console.log('heii')
    const { data } = await api.getDataByCode(auth);
    console.log(data);
    const dataInform = data.result;
    dispatch({ type: GET_DATAINFORM_SUCCESS, payload: dataInform })
  } catch (error) {
    console.log(error);
  }
}

export const getDataTrigger = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getDataTrigger(auth);
    console.log(data);
    const dataInform = data.result;
    dispatch({ type: GET_DATA_TRIGGER_SUCCESS, payload: dataInform })
  } catch (error) {
    console.log(error);
  }
}

export const getAllPort = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getAllPort(auth);
    console.log(data);
    const dataPort = data.result;
    dispatch({ type:GET_DATAPORT_SUCCESS, payload: dataPort })
  } catch (error) {
    console.log(error);
  }
}

export const getCheckPort = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getCheckPort(auth);
    console.log(data);
    const dataPort = data.result;
    dispatch({ type:GET_CHECKPORT_SUCCESS, payload: dataPort })
  } catch (error) {
    console.log(error);
  }
}

export const getLastLogWeigh = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getLastLogWeigh(auth);
    console.log(data);
    const dataWeigh = data.result;
    dispatch({ type: GET_DATAWEIGH_SUCCESS, payload: dataWeigh })
  } catch (error) {
    console.log(error);
  }
}

export const getAllData = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getAllData(auth);
    console.log(data);
    const dataVin = data.result.vin;
    const dataCat = data.result.cat;
    const dataCity = data.result.city;
    const dataDevice = data.result.device;
    dispatch({ type: GET_ALLDATA_SUCCESS, payload: { dataVin, dataCat, dataCity, dataDevice } })
  } catch (error) {
    console.log(error);
  }
}
