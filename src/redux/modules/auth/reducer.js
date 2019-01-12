import { loop } from 'redux-loop';

import {
  USER_FETCH_START,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL
} from './actions';
import { fetchUser } from './service';
import { runLoopFetch } from '../../utils/reduxLoop';

const defaultState = {
  user: null,
  fetching: false
};

export function auth(state = defaultState, action) {
  switch (action.type) {
    case USER_FETCH_START: {
      return loop(
        { ...state, fetching: true },
        runLoopFetch(fetchUser, USER_FETCH_SUCCESS, USER_FETCH_FAIL)
      );
    }

    case USER_FETCH_SUCCESS:
      return { ...state, fetching: false, user: action.payload };

    case USER_FETCH_FAIL:
      return { ...state, fetching: false };

    default:
      return state;
  }
}
