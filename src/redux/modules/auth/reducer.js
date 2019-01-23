import {
  USER_FETCH_START,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL
} from './actions';

import { login } from '../../../services/auth';

const defaultState = {
  user: null,
  fetching: false,
  error: null
};

export function auth(state = defaultState, action) {
  switch (action.type) {
    case USER_FETCH_START: {
      return { ...state, fetching: true, error: null };
    }

    case USER_FETCH_SUCCESS:
      login(action.code);
      return { ...state, fetching: false, user: action.user, error: null };

    case USER_FETCH_FAIL:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
}
