// Access environment variables only from this file
import { APP_STORAGE_KEY, APP_IMAGES_PATH } from 'react-native-dotenv';

export default {
  APP_STORAGE_KEY: APP_STORAGE_KEY || 'futuparty',
  APP_IMAGES_PATH: APP_IMAGES_PATH || 'futuparty'
};
