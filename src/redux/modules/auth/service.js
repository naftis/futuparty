import { apiFetch } from '../../utils/fetch';

export const fetchUser = async () => await apiFetch('/api/user/test');
