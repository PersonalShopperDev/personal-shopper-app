import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useSetRecoilState } from 'recoil';
import { authAtom } from '../../../recoils/atoms';
import { profileAtom } from '../../../recoils/atoms/profile';

import { naver } from '../../../constants';
import { getProfile } from '../../../services/profile';
import authStorage from '../../../storages/auth.storage';
import { WebViewScreenOnlyMain } from '../../ui/Screens';

import { getAccessToken, getNaverAccessToken, putPushToken } from '../../../services/login';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';
import { getPushNotificationsAsync } from '../../../utils/pushNotification.util';

export const NaverLoginScreenOptions = createStackOption({ headerShown: false });
export type NaverLoginScreenParams = ScreenParams<undefined>;
export default function NaverLoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'NaverLoginScreen', AuthStackNavigationProps>) {
  const webViewRef = useRef<WebView>(null);
  const setAuth = useSetRecoilState(authAtom);
  const setProfile = useSetRecoilState(profileAtom);
  const [state] = useState(`${+new Date()}`);

  const loginLogic = async (url: string) => {
    if (url.startsWith(`${naver.uris.redirectUri}?code=`)) {
      const code = url.split('?code=')[1].split('&')[0];

      const naverToken = await getNaverAccessToken(code, state);
      if (!naverToken?.access_token) {
        navigation.goBack();
        return;
      }

      const token = await getAccessToken({
        resource: 'naver',
        token: naverToken.access_token,
      });
      if (!(token?.accessToken && token?.refreshToken)) {
        navigation.goBack();
        return;
      }

      const profile = await getProfile(token.accessToken);
      console.log({ profile });
      if (!profile) {
        navigation.goBack();
        return;
      }

      const pushToken = await getPushNotificationsAsync();
      putPushToken(token.accessToken, { token: pushToken });
      console.log({ pushToken });

      setProfile(profile);
      setAuth({ accessToken: token.accessToken, refreshToken: token.refreshToken });
      authStorage.set('ACCESS_TOKEN', token.accessToken);
      authStorage.set('REFRESH_TOKEN', token.refreshToken);

      navigation.navigate('Main', { screen: 'Matching', params: { screen: 'MatchingScreen' } });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebViewScreenOnlyMain
        ref={webViewRef}
        style={{ flex: 1 }}
        onLoadEnd={async ({ nativeEvent: { url } }) => loginLogic(url)}
        uri={naver.uris.oauth + `&state=${state}`}
        incognito={true}
      />
    </View>
  );
}
