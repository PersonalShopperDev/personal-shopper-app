import React from 'react';
import { View } from 'react-native';

import { WebViewScreenOnlyMain } from '../../ui/Screens';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';

export const LoginScreenOptions = createStackOption({ headerShown: false });
export type LoginScreenParams = ScreenParams<undefined>;
export default function LoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'LoginScreen', AuthStackNavigationProps>) {
  return (
    <View style={{ flex: 1 }}>
      <WebViewScreenOnlyMain
        style={{ flex: 1 }}
        injectedJavaScript={`
            function aTagPreventDefault () {
              var aElementsForKakao = document.querySelectorAll('.kakao-login-button_container__f_njC');
              aElementsForKakao.forEach(function(aElement) {
                aElement.onclick = (e) => {
                  window.ReactNativeWebView.postMessage("kakaoLoginBtnClick");
                  e.preventDefault();
                }
              });
              
              var aElementsForNaver = document.querySelectorAll('.naver-login-button_container__2PsNt');
              aElementsForNaver.forEach(function(aElement) {
                aElement.onclick = (e) => {
                  window.ReactNativeWebView.postMessage("naverLoginBtnClick");
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

          if (data === 'kakaoLoginBtnClick') {
            navigation.navigate('KakaoLoginScreen');
          } else if (data === 'naverLoginBtnClick') {
            navigation.navigate('NaverLoginScreen');
          }
        }}
        uri={'/login'}
        incognito={true}
      />
    </View>
  );
}
