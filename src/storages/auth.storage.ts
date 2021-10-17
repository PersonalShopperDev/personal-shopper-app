import { Storage } from './index';

interface AuthStorageType {
  REFRESH_TOKEN: string;
  ACCESS_TOKEN: string;
}
export default new Storage<AuthStorageType>('auth', {
  REFRESH_TOKEN: {
    description: '새로 고침 토큰',
    defaultValue: '',
  },
  ACCESS_TOKEN: {
    description: '액세스 토큰',
    defaultValue: '',
  },
});
