import { GET_DATAKALIBRASI_SUCCESS, GET_DATA_KALIBRASI_BY_DATE } from '../constants/actionTypes';
import * as api from '../api';
import download from 'downloadjs';

export const getDataKalibrasi = (auth) => async (dispatch) => {
  try{
    const { data } = await api.getDataKalibrasi(auth);
    console.log(data);
    const dataCalibration = data.result
    dispatch({ type: GET_DATAKALIBRASI_SUCCESS, payload: dataCalibration })
  } catch (error) {
    console.log(error);
  }
}

export const getDataKalibrasiByDate = (auth, startDate, endDate) => async (dispatch) => {
  try{
    const { data } = await api.getDataKalibrasiByDate(auth, startDate, endDate);
    console.log(data);
    const dataCalibration = data.result;
    dispatch({ type: GET_DATA_KALIBRASI_BY_DATE, payload: dataCalibration })
  } catch (error) {
    console.log(error);
  }
}

export const getReportDataKalibrasiByDate= (auth, user_id, start, end) => async () => {
  try{
    const { data } = await api.getReportDataKalibrasiByDate(auth, user_id, start, end);
    download(data, `report-calibration-${start}-${end}.PDF`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const getReportDataKalibrasi= (auth, user_id) => async () => {
  try{
    const { data } = await api.getReportDataKalibrasi(auth, user_id);
    download(data, 'report-calibration.PDF');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
