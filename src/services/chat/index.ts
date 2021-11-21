import request from '../../utils/request.util';

import { getChatRes } from './type';

// https://api.yourpersonalshoppers.com/v1/chat/84
export const getChat = (id: number, token: string) => {
  const res = request.get<{}, getChatRes>(`/chat/${id}`, token);
  return res;
};
