import { Storage } from './index';

interface OptionStorageType {
  TEST_OPTION_1: boolean;
}
export default new Storage<OptionStorageType>('option', {
  TEST_OPTION_1: {
    description: '테스트 옵션입니다',
    defaultValue: true,
  },
});
