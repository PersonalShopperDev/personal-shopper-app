import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useSetRecoilState } from 'recoil';
import { authAtom } from '../../../recoils/atoms';

import { kakao } from '../../../constants';
import authStorage from '../../../storages/auth.storage';
import { WebViewScreenOnlyMain } from '../../ui/Screens';

import { getAccessToken, getKaKaoAccessToken } from '../../../services/login';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';

export const KakaoLoginScreenOptions = createStackOption({ headerShown: false });
export type KakaoLoginScreenParams = ScreenParams<undefined>;
export default function KakaoLoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'KakaoLoginScreen', AuthStackNavigationProps>) {
  const webViewRef = useRef<WebView>(null);
  const setAuth = useSetRecoilState(authAtom);

  const loginLogic = async (url: string) => {
    if (url.startsWith(`${kakao.uris.redirectUri}?code=`)) {
      const code = url.split('?code=')[1];

      const kakaoToken = await getKaKaoAccessToken(code);
      if (!kakaoToken?.access_token) {
        navigation.goBack();
        return;
      }

      const token = await getAccessToken({
        resource: 'kakao',
        token: kakaoToken.access_token,
      });

      if (!(token?.accessToken && token?.refreshToken)) {
        navigation.goBack();
        return;
      }

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
        uri={kakao.uris.oauth}
      />
    </View>
  );
}
