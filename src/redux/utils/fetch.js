import * as R from 'ramda';

import { HttpError } from './HttpError';

// Generic fetch function to be used with our backend
export async function apiFetch(endpoint, options = {}) {
  const defaultFetchOpts = { credentials: 'same-origin' };

  const res = await fetch(endpoint, R.merge(defaultFetchOpts, options));

  if (!res.ok) {
    throw new HttpError({ status: res.status, message: res.statusText });
  }

  return res.json();
}
