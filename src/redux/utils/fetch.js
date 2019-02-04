import config from '../../config';

// Generic fetch function to be used with our backend
export async function apiFetch(url, options = {}) {
  const defaultFetchOpts = {
    credentials: 'same-origin',
    headers: {
      'x-user-uuid': 'fjsdlfjas',
      'Content-Type': 'application/json',
      'x-token': config.API_TOKEN
    }
  };

  const res = await fetch(`${config.API_URL}${url}`, {
    ...defaultFetchOpts,
    ...options
  });

  if (!res.ok) {
    throw new Error('Error with request.');
  }

  return res.json();
}
