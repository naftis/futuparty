import config from './config';

export async function getFeed() {
  const request = await fetch(`${config.API_URL}/feed`);
  const response = await request.json();

  return response;
}

export function getProfileImageUrl() {
  return 'https://placehold.it/350x350';
}
