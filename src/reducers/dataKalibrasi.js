import { GET_DATAKALIBRASI_FAILED, GET_DATAKALIBRASI_SUCCESS, GET_DATA_KALIBRASI_BY_DATE } from '../constants/actionTypes';

const initialState = {
  calibration:[],
  loading: true,
  error: ""
};

export default (dataKalibrasi = initialState, action) => {
  switch(action.type){
    case GET_DATAKALIBRASI_SUCCESS:
    return { ...dataKalibrasi,
             loading: false,
             calibration: action.payload
    };
    case GET_DATA_KALIBRASI_BY_DATE:
    return { ...dataKalibrasi,
             loading: false,
             calibration: action.payload
    };
    default:
      return dataKalibrasi;
  }
}
