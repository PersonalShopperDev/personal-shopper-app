import { Storage } from './index';

interface AppStorageType {
  TEST_APP_1: string;
}
export default new Storage<AppStorageType>('app', {
  TEST_APP_1: {
    description: '앱 버전 정보 입니다.',
    defaultValue: '0.0.0.0',
  },
});
