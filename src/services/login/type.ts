export interface getKaKaoAccessTokenRes {
  access_token: string;
  refresh_token: string;
}

export interface getNaverAccessTokenRes {
  access_token: string;
  refresh_token: string;
}

export interface getAccessTokenRef {
  resource: 'kakao' | 'naver';
  token: string;
}
export interface getAccessTokenRes {
  accessToken: string;
  refreshToken: string;
}
