import { Platform } from 'react-native';
import { AppStackParamList } from '../navigation';
import { expo } from './expo.constant';

const webBaseUri = 'https://www.yourpersonalshoppers.com';

export type convertedNavigate = undefined extends AppStackParamList[keyof AppStackParamList]
  ?
      | [keyof AppStackParamList]
      | [keyof AppStackParamList, AppStackParamList[keyof AppStackParamList]]
  : [keyof AppStackParamList, AppStackParamList[keyof AppStackParamList]];
export type ConvertableHref = '/' | '/login' | '/intro' | '/users/stylist' | '/chat' | '/profile';

const convertHrefToNavigateObject: Record<ConvertableHref, convertedNavigate> = {
  '/': ['Main', { screen: 'Matching', params: { screen: 'MatchingScreen' } }],
  '/login': ['Auth', { screen: 'LoginScreen' }],
  '/intro': ['Main', { screen: 'Matching', params: { screen: 'IntroScreen' } }],
  '/users/stylist': ['Main', { screen: 'Matching', params: { screen: 'StylistScreen' } }],
  '/chat': ['Main', { screen: 'Chatting', params: { screen: 'ChattingScreen' } }],
  '/profile': ['Main', { screen: 'Mypage', params: { screen: 'MypageScreen' } }],
};

export const app = {
  version: `${expo.manifest?.version}(${Platform.select({
    ios: Number(expo.manifest?.ios?.buildNumber),
    android: expo.manifest?.android?.versionCode,
  })})`,
  webBaseUri,
  convertHrefToNavigateObject,
};
