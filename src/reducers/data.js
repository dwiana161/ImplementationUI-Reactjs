import {
  ADD_MANUAL_SUCCESS,
  CONNECT_PORT_SUCCESS,
  GET_ALLDATA_SUCCESS,
  GET_DATAPORT_SUCCESS,
  GET_DATAWEIGH_SUCCESS,
  GET_DATAINFORM_SUCCESS,
  GET_DATA_TRIGGER_SUCCESS,
  GET_CHECKPORT_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  dataVin: [],
  dataInform:[],
  dataList: [],
  dataPort:[],
  dataCat: [],
  dataCity: [],
  dataDevice: [],
  port: null,
  checkPort: null,
  loading: true,
  error: ""
};

export default (data = initialState, action) => {
  switch(action.type){
    case GET_DATAINFORM_SUCCESS:
    return { ...data,
             loading: false,
             dataInform: action.payload
    };
    case GET_DATA_TRIGGER_SUCCESS:
    return { ...data,
             loading: false,
             dataInform: action.payload
    };
    case GET_DATAWEIGH_SUCCESS:
    return { ...data,
             loading: false,
             dataList: action.payload
    };
    case GET_DATAPORT_SUCCESS:
    return { ...data,
             loading: false,
             dataPort: action.payload
    };
    case GET_ALLDATA_SUCCESS:
    return { ...data,
             loading: false,
             dataVin: action.payload.dataVin,
             dataCat: action.payload.dataCat,
             dataCity: action.payload.dataCity,
             dataDevice: action.payload.dataDevice,
    };
    case CONNECT_PORT_SUCCESS:
    return { ...data,
             loading: false,
             port: action.data
    };
    case GET_CHECKPORT_SUCCESS:
    return { ...data,
             loading: false,
             checkPort: action.payload
    };
    case ADD_MANUAL_SUCCESS:
      data['loading'] = false;
      let dataTemp = data['dataList']
      dataTemp = [...dataTemp, action.payload];
      data['dataList'] = dataTemp;
      return data;
    default:
      return data;
  }
}
