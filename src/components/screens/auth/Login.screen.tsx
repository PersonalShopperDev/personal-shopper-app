import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';

import BasicCenter from '../../templates/BasicCenter';
import { WebViewScreenOnlyMain } from '../../ui/Screens';

export const LoginScreenOptions = createStackOption({});
export type LoginScreenParams = ScreenParams<undefined>;
export default function LoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'LoginScreen', AuthStackNavigationProps>) {
  const webViewRef = useRef<WebView>(null);
  const currentUrl = useRef('');
  const [isAuth, setAuth] = useState(false);

  // https://yourpersonalshoppers.com/login/naver/callback

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain ref={webViewRef} style={{ flex: 1 }} uri={'/login'} />}
    />
  );
}
