import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { authAtom } from '../../../../recoils/atoms';

import { app } from '../../../../constants';

import { WebViewScreenProps } from './type';

import { convertHrefToNavigate } from './convertHrefToNavigate';

export function WebViewScreen({ uri, ...props }: WebViewScreenProps) {
  return <WebView {...props} source={{ uri }} />;
}

export const WebViewScreenOnlyMain = forwardRef<WebView | undefined, WebViewScreenProps>(
  ({ uri, ...props }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [auth, setAuth] = useRecoilState(authAtom);

    useImperativeHandle(ref, () => webViewRef.current || undefined, []);

    const navigation = useNavigation();

    useEffect(() => {
      webViewRef.current?.reload();
    }, [auth]);

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

          if (data.includes('navigate: ')) {
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
        incognito={uri === '/login' ? true : false}
      />
    );
  },
);
