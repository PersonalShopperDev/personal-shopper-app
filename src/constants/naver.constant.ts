import { app } from './app.constant';

const clientId = 'oR_SLOmDtZX_J4j5KXLD';
const clientSecret = 'w7UhNZ4pJa';

const authUri = 'https://nid.naver.com/oauth2.0';
const redirectUri = `${app.webBaseUri}/login/naver/callback`;

// add "&state=${state}"
const oauthUri = `${authUri}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

export const naver = {
  uris: { auth: authUri, oauth: oauthUri, redirectUri },
  clientId,
  clientSecret,
};
