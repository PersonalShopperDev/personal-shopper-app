import request from '../../utils/request.util';
import { kakao, naver } from '../../constants';

import {
  getKaKaoAccessTokenRes,
  getNaverAccessTokenRes,
  getAccessTokenRef,
  getAccessTokenRes,
} from './type';

export const getKaKaoAccessToken = (code: string) => {
  const res = request.post<{}, getKaKaoAccessTokenRes>(
    `${kakao.uris.auth}/oauth/token?grant_type=authorization_code&client_id=${kakao.clientId}&redirect_uri=${kakao.uris.redirectUri}&code=${code}`,
    {},
  );
  return res;
};

export const getNaverAccessToken = (code: string, state: string) => {
  const res = request.post<{}, getNaverAccessTokenRes>(
    `${naver.uris.auth}/token?grant_type=authorization_code&client_id=${naver.clientId}&client_secret=${naver.clientSecret}&redirect_uri=${kakao.uris.redirectUri}&code=${code}&state=${state}`,
    {},
  );
  return res;
};

export const getAccessToken = (req: getAccessTokenRef) => {
  const res = request.post<getAccessTokenRef, getAccessTokenRes>(`/auth/login`, req);
  return res;
};
