import request from '../../utils/request.util';

import { getProfileRes } from './type';

export const getProfile = (token: string) => {
  const res = request.get<{}, getProfileRes>(`/profile`, token);
  return res;
};
