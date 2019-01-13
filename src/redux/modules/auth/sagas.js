import { put, takeLatest, call } from 'redux-saga/effects';

import {
  USER_FETCH_START,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL
} from './actions';
import { fetchUser } from './service';

function* fetchUserSaga(action) {
  try {
    const data = yield call(fetchUser, action.code);
    yield put({ type: USER_FETCH_SUCCESS, user: data.user, code: action.code });
  } catch (error) {
    yield put({ type: USER_FETCH_FAIL, error });
  }
}

export default function* actionWatcher() {
  yield takeLatest(USER_FETCH_START, fetchUserSaga);
}
