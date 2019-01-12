/*
 * Used to reduce boilerplate when creating simple redux-loop side-effects.
 * runLoopFetch() can be directly provided with the success & fail action-types,
 * which removes necessity to create actionCreator functions for each one.
 */

import { Cmd } from 'redux-loop';

const actionCreator = type => {
  return (payload?) => ({ type, payload });
};

export const runLoopFetch = (fetchFn, successAction, failAction, args?) => {
  return Cmd.run(fetchFn, {
    args,
    successActionCreator: actionCreator(successAction),
    failActionCreator: actionCreator(failAction)
  });
};
