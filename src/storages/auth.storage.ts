import { Storage } from './index';

interface AuthStorageType {
  TEST_AUTH_1: string;
}
export default new Storage<AuthStorageType>('auth', {
  TEST_AUTH_1: {
    description: '앱 버전 정보 입니다.',
    defaultValue: '0.0.0.0',
  },
});
