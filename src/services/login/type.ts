export interface getKaKaoAccessTokenRes {
  access_token: string;
  refresh_token: string;
}

export interface getNaverAccessTokenRes {
  access_token: string;
  refresh_token: string;
}

export interface getAccessTokenReq {
  resource: 'kakao' | 'naver' | 'apple';
  token: string;
  data?: string;
}
export interface getAccessTokenRes {
  accessToken: string;
  refreshToken: string;
}

export interface putPushTokenReq {
  token: string;
}

export interface putPushTokenRes {}
