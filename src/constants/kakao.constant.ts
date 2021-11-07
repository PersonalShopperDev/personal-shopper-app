import { app } from './app.constant';

const clientId = '4e2181242014137665e09a95c7f8ef1d';

const authUri = 'https://kauth.kakao.com';
const apiUri = 'https://kapi.kakao.com';
const redirectUri = `${app.webBaseUri}/login/kakao/callback`;

const oauthUri =
  authUri + `/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

export const kakao = {
  uris: { auth: authUri, api: apiUri, oauth: oauthUri, redirectUri },
  clientId,
};
