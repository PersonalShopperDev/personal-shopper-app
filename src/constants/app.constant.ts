import { Platform } from 'react-native';
import { expo } from './expo.constant';

const serverBaseUri = 'https://api.yourpersonalshoppers.com/v1';
const webBaseUri = 'https://yourpersonalshoppers.com';
// const webBaseUri = 'http://192.168.0.25:3000';

// const webBaseUri = 'https://www.yourpersonalshoppers.com';
// 'https://www.yourpersonalshoppers.com'
// 'http://localhost:8080'
//

export const app = {
  version: `${expo.manifest?.version}(${Platform.select({
    ios: Number(expo.manifest?.ios?.buildNumber),
    android: expo.manifest?.android?.versionCode,
  })})`,
  webBaseUri,
  serverBaseUri,
};
