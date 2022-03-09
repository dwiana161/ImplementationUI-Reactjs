import { FETCH_VEHICLE, GET_DATA_SUCCESS, GET_VEHICLE_REPORT, GET_DATA_KENDARAAN_BY_DATE } from '../constants/actionTypes';
import * as api from '../api';
import download from 'downloadjs';

export const getDataKendaraan = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getDataKendaraan(auth);
    console.log(data);
    const dataVehicle = data.result;
    dispatch({ type: GET_DATA_SUCCESS, payload: dataVehicle })
  } catch (error) {
    console.log(error);
  }
}

export const getDataKendaraanByDate = (auth, startDate, endDate) => async (dispatch) => {
  try{
    const { data } = await api.getDataKendaraanByDate(auth, startDate, endDate);
    console.log(data);
    const dataVehicle = data.result;
    dispatch({ type: GET_DATA_KENDARAAN_BY_DATE, payload: dataVehicle })
  } catch (error) {
    console.log(error);
  }
}

export const getReportDataKendaraanByDate= (auth, user_id, start, end) => async () => {
  try{
    const { data } = await api.getReportDataKendaraanByDate(auth, user_id, start, end);
    download(data, `report-weigh-${start}-${end}.PDF`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const getReportDataKendaraan= (auth, user_id) => async () => {
  try{
    const { data } = await api.getReportDataKendaraan(auth, user_id);
    download(data, 'report-weigh.PDF');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
