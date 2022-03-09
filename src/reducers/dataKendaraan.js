import { GET_DATA_FAILED, GET_DATA_SUCCESS, GET_VEHICLE_REPORT, GET_DATA_KENDARAAN_BY_DATE } from '../constants/actionTypes';

const initialState = {
  vehicles:[],
  loading: true,
  error: ""
};

export default (dataKendaraan = initialState, action) => {
  switch(action.type){
    case GET_DATA_SUCCESS:
    return { ...dataKendaraan,
             loading: false,
             vehicles: action.payload
    };
    case GET_VEHICLE_REPORT:
    return { ...dataKendaraan,
             loading: false,
             vehicles: action.payload
    };
    case GET_DATA_KENDARAAN_BY_DATE:
    return { ...dataKendaraan,
             loading: false,
             vehicles: action.payload
    };
    default:
      return dataKendaraan;
  }
}
