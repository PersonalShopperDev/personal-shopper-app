import { Platform } from 'react-native';
import { expo } from './expo.constant';

const webBaseUri = 'https://www.yourpersonalshoppers.com';
// const webBaseUri = 'https://www.yourpersonalshoppers.com';
// 'https://www.yourpersonalshoppers.com'
// 'http://localhost:8080'

export const app = {
  version: `${expo.manifest?.version}(${Platform.select({
    ios: Number(expo.manifest?.ios?.buildNumber),
    android: expo.manifest?.android?.versionCode,
  })})`,
  webBaseUri,
};
