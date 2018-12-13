import { Platform } from 'react-native';

export default {
  default: Platform.OS === 'ios' ? 'Iowan Old Style' : 'serif',
  monospace: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
};
