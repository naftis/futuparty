// Only access environment variables from this file
import { APP_STORAGE_KEY, APP_IMAGES_PATH, API_URL } from 'react-native-dotenv';

export default {
  APP_STORAGE_KEY: APP_STORAGE_KEY || 'futuparty',
  APP_IMAGES_PATH: APP_IMAGES_PATH || 'futuparty',
  API_URL: API_URL || 'http://localhost:9000/api'
};
