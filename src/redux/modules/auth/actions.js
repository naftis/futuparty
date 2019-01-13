export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAIL = 'USER_FETCH_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const initFetchUser = code => ({
  code,
  type: USER_FETCH_START
});
