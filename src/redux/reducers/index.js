import networkReducer from './networkReducer';
import viewReducer from './viewReducer';
import configReducer from './configReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  network: networkReducer,
  view: viewReducer,
  config: configReducer
});

export default reducers;
