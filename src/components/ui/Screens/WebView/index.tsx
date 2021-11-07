import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { authAtom } from '../../../../recoils/atoms';
import { AppDrawerNavigationProps } from '../../../../navigation';

import { app } from '../../../../constants';

import { WebViewScreenProps } from './type';

import { useNavigation } from '@react-navigation/core';
import authStorage from '../../../../storages/auth.storage';

import { convertHrefToNavigate } from './convertHrefToNavigate';
import { Keyboard } from 'react-native';

export function WebViewScreen({ uri, ...props }: WebViewScreenProps) {
  return <WebView {...props} source={{ uri }} />;
}

export const WebViewScreenOnlyMain = forwardRef<WebView | undefined, WebViewScreenProps>(
  ({ uri, ...props }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [auth, setAuth] = useRecoilState(authAtom);

    useImperativeHandle(ref, () => webViewRef.current || undefined, []);

    useEffect(() => {
      const resetHeight = () => {
        webViewRef.current?.injectJavaScript(`
          if(height) document.getElementById('__next').style.height = height;
        `);
      };

      Keyboard.addListener('keyboardWillHide', resetHeight);
      Keyboard.addListener('keyboardDidHide', resetHeight);
      return () => {
        Keyboard.removeAllListeners('keyboardWillHide');
        Keyboard.removeAllListeners('keyboardDidHide');
      };
    });

    const navigation = useNavigation();
    return (
      <WebView
        originWhitelist={['*']}
        ref={webViewRef}
        {...props}
        scrollEnabled={false}
        injectedJavaScript={
          `
          ReactNativeWebView.postMessage("cookie: " + document.cookie);
          
          const meta = document.createElement('meta');
          meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, maximum-scale=1.0, target-densityDpi=device-dpi');
          meta.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(meta); 
  
          const styleSheet = document.createElement("style")
          styleSheet.type = "text/css"
          styleSheet.innerText = "#__next { max-width: none; height: 100vh !important; } .default_header__3cA4S { display: none; } .default_bottom__2cPWr { display: none; } body { background-color: #fff; }"
          document.head.appendChild(styleSheet)
          

          function aTagPreventDefault () {
            var aElements = document.querySelectorAll('a');
            aElements.forEach(function(aElement) {
              aElement.onclick = (e) => {
                window.ReactNativeWebView.postMessage("navigate: " +aElement.getAttribute("href"));
                e.preventDefault();
                e.stopPropagation();
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
    
          ` +
          (auth
            ? `document.cookie = 'personalshopper_accessToken=${auth.accessToken};'
            document.cookie = 'personalshopper_refreshToken=${auth.refreshToken};'`
            : '') +
          (props.injectedJavaScript || '')
        }
        onMessage={(event) => {
          const { data } = event.nativeEvent;

          if (data.includes('cookie: ')) {
            if (
              data.split('cookie: ')[1].includes('personalshopper_accessToken=') &&
              data.split('cookie: ')[1].includes('personalshopper_refreshToken=')
            ) {
              const accessToken = data
                .split('cookie: ')[1]
                .split('personalshopper_accessToken=')[1]
                .split('; ')[0];
              const refreshToken = data
                .split('cookie: ')[1]
                .split('personalshopper_refreshToken=')[1]
                .split('; ')[0];

              console.log('setAuth for token');
              authStorage.set('ACCESS_TOKEN', accessToken);
              authStorage.set('REFRESH_TOKEN', refreshToken);
              setAuth({ accessToken, refreshToken });
            }
          } else if (data.includes('navigate: ')) {
            const herf = data.replace('navigate: ', '');
            const navigate = convertHrefToNavigate(herf);
            if (navigate) {
              navigation.navigate(navigate[0], navigate[1]);
              console.log('네비게이션! : ', herf);
            } else {
              console.log('매칭 아직 안됨 : ', herf);
            }
          }

          props.onMessage && props.onMessage(event);
        }}
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        source={{
          uri: uri.includes('http') || uri.includes('https') ? uri : app.webBaseUri + uri,
        }}
      />
    );
  },
);
