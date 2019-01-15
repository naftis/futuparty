import { Platform } from 'react-native';

export default (Platform.OS === 'ios'
  ? {
    default: 'Iowan Old Style',
    monospace: 'Menlo',
    monospaceBold: 'Menlo-Bold'
  }
  : {
    default: 'serif',
    monospace: 'monospace',
    monospaceBold: 'monospace'
  });
