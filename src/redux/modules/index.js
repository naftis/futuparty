import { combineReducers } from 'redux-loop';

import { auth } from './auth/reducer';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
