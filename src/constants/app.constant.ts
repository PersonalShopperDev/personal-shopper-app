import { Platform } from 'react-native';
import { expo } from './expo.constant';

// const webBaseUri = 'http://172.30.1.8:8080';
const webBaseUri = 'https://www.yourpersonalshoppers.com';

// 'https://www.yourpersonalshoppers.com'
// 'http://localhost:8080'
// '172.30.1.28:3000'

export const app = {
  version: `${expo.manifest?.version}(${Platform.select({
    ios: Number(expo.manifest?.ios?.buildNumber),
    android: expo.manifest?.android?.versionCode,
  })})`,
  webBaseUri,
};
