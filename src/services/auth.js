import { AsyncStorage } from 'react-native';
import config from '../config';

const APP_CODE_KEY = `${config.APP_STORAGE_KEY}:code`;

export async function isLoggedIn() {
  const code = await AsyncStorage.getItem(APP_CODE_KEY);
  return Boolean(code);
}

export async function getCode() {
  return await AsyncStorage.getItem(APP_CODE_KEY);
}

export async function login(code) {
  await AsyncStorage.setItem(APP_CODE_KEY, code);
}

export async function logout() {
  await AsyncStorage.removeItem(APP_CODE_KEY);
}
