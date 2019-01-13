import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { auth } from './auth/reducer';
import authSaga from './auth/sagas';

export const rootReducer = combineReducers({
  auth
});

export function* rootSaga() {
  yield all([authSaga()]);
}
