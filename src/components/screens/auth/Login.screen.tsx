import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';

import BasicCenter from '../../templates/BasicCenter';
import { Screen, WebViewScreenOnlyMain } from '../../ui/Screens';

import request from '../../../utils/request.util';
import { View } from 'react-native';

export const LoginScreenOptions = createStackOption({ headerShown: false });
export type LoginScreenParams = ScreenParams<undefined>;
export default function LoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'LoginScreen', AuthStackNavigationProps>) {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState('/login');
  const [isAuth, setAuth] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <WebViewScreenOnlyMain
        ref={webViewRef}
        style={{ flex: 1 }}
        injectedJavaScript={`
            function aTagPreventDefault () {
              var aElements = document.querySelectorAll('.kakao-login-button_container__f_njC');
              aElements.forEach(function(aElement) {
                aElement.onclick = (e) => {
                  window.ReactNativeWebView.postMessage("kakaoLoginBtnClick");
                  e.preventDefault();
                }
              });
            }
            
            aTagPreventDefault();
      
            window.onload = function() { aTagPreventDefault(); };
            
            var target = document.querySelector('body');
            var observer = new MutationObserver(function(mutations) {
              aTagPreventDefault();
            });
            var config = { attributes: true, childList: true, characterData: true };
            observer.observe(target, config);

          `}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          console.log('data');
          if (data === 'kakaoLoginBtnClick') {
            setCurrentUrl(
              `https://kauth.kakao.com/oauth/authorize?client_id=${'4e2181242014137665e09a95c7f8ef1d'}&redirect_uri=${'https://yourpersonalshoppers.com/login/kakao/callback'}&response_type=code`,
            );
          }
        }}
        onLoadEnd={async ({ nativeEvent }) => {
          console.log({ url: nativeEvent.url });
          if (
            currentUrl ===
            `https://kauth.kakao.com/oauth/authorize?client_id=${'4e2181242014137665e09a95c7f8ef1d'}&redirect_uri=${'https://yourpersonalshoppers.com/login/kakao/callback'}&response_type=code`
          ) {
            if (
              nativeEvent.url.includes(
                'https://yourpersonalshoppers.com/login/kakao/callback?code=',
              )
            ) {
              const code = nativeEvent.url.split('?code=')[1];
              console.log({ code });
              // url: 'https://kauth.kakao.com/oauth/token',
              //   method: 'POST',
              //   payload: {
              //     grant_type: 'authorization_code',
              //     client_id: '4e2181242014137665e09a95c7f8ef1d',
              //     redirect_uri: 'https://yourpersonalshoppers.com/login/kakao/callback',
              //     code,
              //   },
              // }&
              request
                .post<
                  {},
                  {
                    access_token: string;
                    expires_in: string;
                    refresh_token: string;
                    refresh_token_expires_in: string;
                    token_type: string;
                  }
                >(
                  `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=1da20c3e5b72ac61b3a81fb7ea19e3a3&redirect_uri=https://yourpersonalshoppers.com/login/kakao/callback&code=${code}`,
                  {},
                )
                .then(
                  (res) =>
                    res?.access_token &&
                    res?.expires_in &&
                    res?.refresh_token &&
                    res?.refresh_token_expires_in &&
                    res?.token_type &&
                    setCurrentUrl(
                      `https://yourpersonalshoppers.com/login/kakao/callback?access_token=${res.access_token}&expires_in=${res.expires_in}&refresh_token=${res.refresh_token}&refresh_token_expires_in=${res.refresh_token_expires_in}&token_type=${res.token_type}`,
                    ),
                )
                .catch((e) => {
                  console.log(e);
                });

              // try {
              //   const formData = new FormData();
              //   formData.append('grant_type', 'authorization_code');
              //   formData.append('client_id', '1da20c3e5b72ac61b3a81fb7ea19e3a3');
              //   formData.append(
              //     'redirect_uri',
              //     'https://yourpersonalshoppers.com/login/kakao/callback',
              //   );
              //   formData.append('code', code);

              //   const res = request
              //     .post('https://kauth.kakao.com/oauth/token', formData, true)
              //     .then((res) => console.log({ res }))
              //     .catch((e) => console.log(e));
              // } catch (e) {
              //   console.log({ e });
              // }

              // .then((res) => console.log({ res }))
              // .catch((e) => {
              //   console.log(e);
              // });
            }
          }
        }}
        uri={currentUrl}
      />
    </View>
  );
}
