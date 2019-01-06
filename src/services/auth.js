import { AsyncStorage } from 'react-native';
import config from '../config';
import { registerUser } from './api';

const APP_USER_KEY = `${config.APP_STORAGE_KEY}:user`;
const APP_CODE_KEY = `${config.APP_STORAGE_KEY}:code`;

export async function isLoggedIn() {
  const code = await AsyncStorage.getItem(APP_CODE_KEY);
  return Boolean(code);
}

export async function login(code) {
  await AsyncStorage.removeItem(APP_USER_KEY);
  await AsyncStorage.removeItem(APP_CODE_KEY);

  const user = await registerUser(code);

  await AsyncStorage.setItem(APP_USER_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(APP_CODE_KEY, code);
}

export async function logout() {
  await AsyncStorage.removeItem(APP_USER_KEY);
  await AsyncStorage.removeItem(APP_CODE_KEY);
}
