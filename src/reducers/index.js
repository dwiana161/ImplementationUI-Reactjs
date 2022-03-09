import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';
import dataKendaraan from './dataKendaraan';
import dataKalibrasi from './dataKalibrasi';

export const reducers = combineReducers({ auth, data, dataKendaraan, dataKalibrasi });
