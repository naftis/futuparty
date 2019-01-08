import DeviceInfo from 'react-native-device-info';

import config from '../config';
import { getPreSignedUrl } from './aws';

function makeId() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const apiFetch = (url, opts) => {
  opts = opts || {};
  opts.headers = opts.headers || {};

  // TODO correct x-user-uuid & token from env

  // opts.headers['x-client-version'] = VERSION_NUMBER;
  opts.headers['x-user-uuid'] = 'fjsdlfjas';
  opts.headers['Content-Type'] = 'application/json';
  opts.headers['x-token'] = 'token';
  return fetch(`${config.API_URL}${url}`, opts);
};

export async function registerUser(code) {
  const response = await apiFetch('/register', {
    method: 'PUT',
    body: JSON.stringify({
      code,
      uuid: DeviceInfo.getUniqueID()
    })
  });

  if (response.status !== 200) {
    throw new Error('Error registering user');
  }

  const responseBody = await response.json();
  return responseBody.user;
}

export async function getFeed() {
  const request = await apiFetch('/feed');
  const response = await request.json();

  return response;
}

export async function getUserFeed() {
  // TODO: get current user feed
  return getFeed();
}

export async function postFeedItem(image, text) {
  let imageUrl;

  if (image) {
    const imageData = { itemName: makeId() + image.fileName, url: image.uri };

    try {
      imageUrl = await getPreSignedUrl(imageData, 'img');
    } catch (e) {
      console.error(e);
    }
  }

  const body = JSON.stringify({
    user: 'fjsdlfjas',
    description: text,
    image: imageUrl
  });

  const request = await apiFetch('/feed', {
    body,
    method: 'POST'
  });

  if (!request.ok) {
    throw new Error('Error when posting item.');
  }

  return await request.json();
}

export async function postComment(text, feedItemId) {
  const body = JSON.stringify({
    text
  });

  const request = await apiFetch(`/feed/${feedItemId}/comment`, {
    body,
    method: 'POST'
  });

  if (!request.ok) {
    throw new Error('Error when posting comment.');
  }

  return await request.json();
}

export async function getComments(feedItemId) {
  const request = await apiFetch(`/feed/${feedItemId}/comments`);

  if (!request.ok) {
    throw new Error('Error when fetching comments.');
  }

  return await request.json();
}

export async function addLike(feedItemId) {
  const request = await apiFetch(`/feed/${feedItemId}/like`, {
    method: 'POST'
  });

  if (!request.ok) {
    throw new Error('Error when adding like.');
  }

  return await request.json();
}

export async function removeLike(feedItemId) {
  const request = await apiFetch(`/feed/${feedItemId}/like`, {
    method: 'DELETE'
  });

  if (!request.ok) {
    throw new Error('Error when removing like.');
  }

  return await request.json();
}

export function getProfileImageUrl() {
  return 'https://placeimg.com/640/480/any';
}
