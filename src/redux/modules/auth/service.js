import DeviceInfo from 'react-native-device-info';

import { apiFetch } from '../../utils/fetch';

export const fetchUser = code =>
  apiFetch('/register', {
    method: 'PUT',
    body: JSON.stringify({
      code,
      uuid: DeviceInfo.getUniqueID()
    })
  });
