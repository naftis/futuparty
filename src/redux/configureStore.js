import { createStore, compose } from 'redux';
import { install } from 'redux-loop';

import rootReducer from './modules';

export function configureStore(initialState?) {
  const enhancer = compose(install());

  // @ts-ignore
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
