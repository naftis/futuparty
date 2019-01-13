import {
  USER_FETCH_START,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  USER_LOGOUT
} from './actions';

const defaultState = {
  user: null,
  fetching: false,
  error: null
};

export function auth(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case USER_FETCH_START: {
      return { ...state, fetching: true, error: null };
    }

    case USER_FETCH_SUCCESS:
      return { ...state, fetching: false, user: action.payload, error: null };

    case USER_FETCH_FAIL:
      return { ...state, fetching: false, error: action.error };

    case USER_LOGOUT: {
      return { ...state, fetching: false, error: null, user: null };
    }

    default:
      return state;
  }
}
