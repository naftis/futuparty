import * as R from 'ramda';

import config from '../../config';

// Generic fetch function to be used with our backend
export async function apiFetch(url, options = {}) {
  const defaultFetchOpts = {
    credentials: 'same-origin',
    headers: {
      'x-user-uuid': 'fjsdlfjas',
      'Content-Type': 'application/json',
      'x-token': 'token'
    }
  };

  const res = await fetch(
    `${config.API_URL}${url}`,
    R.merge(defaultFetchOpts, options)
  );

  if (!res.ok) {
    throw new Error('Error with request.');
  }

  return await res.json();
}
