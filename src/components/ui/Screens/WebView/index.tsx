import React, { forwardRef } from 'react';

import { WebView } from 'react-native-webview';

import { useRecoilValue } from 'recoil';
import { AuthAtom } from '../../../../recoils/atoms';
import { AppStackNavigationProps } from '../../../../navigation';

import { app, ConvertableHref } from '../../../../constants';

import { WebViewScreenProps, convertHrefToNavigateProps } from './type';

import { useNavigation } from '@react-navigation/core';

export function WebViewScreen({ uri, ...props }: WebViewScreenProps) {
  return <WebView {...props} source={{ uri }} />;
}

export const WebViewScreenOnlyMain = forwardRef<WebView, WebViewScreenProps>(
  ({ uri, ...props }, ref) => {
    // const auth = useRecoilValue(AuthAtom);

    const navigation = useNavigation<AppStackNavigationProps>();
    return (
      <WebView
        ref={ref}
        {...props}
        scrollEnabled={false}
        injectedJavaScript={
          `
          const meta = document.createElement('meta');
          meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, maximum-scale=1.0, target-densityDpi=device-dpi');
          meta.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(meta); 
  
          const styleSheet = document.createElement("style")
          styleSheet.type = "text/css"
          styleSheet.innerText = ".default_header__3cA4S { display: none; } .default_bottom__2cPWr { display: none; } body { background-color: #fff; }"
          document.head.appendChild(styleSheet)
          
          function aTagPreventDefault () {
            var aElements = document.querySelectorAll('a');
            aElements.forEach(function(aElement) {
              aElement.onclick = (e) => {
                window.ReactNativeWebView.postMessage(aElement.getAttribute("href"));
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
    
          ` + (props.injectedJavaScript || '')
        }
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          convertHrefToNavigate({ href: data, navigation });
        }}
        sharedCookiesEnabled
        source={{ uri: app.webBaseUri + uri }}
      />
    );
  },
);

function convertHrefToNavigate({ href, navigation }: convertHrefToNavigateProps) {
  if (Object.keys(app.convertHrefToNavigateObject).includes(href)) {
    const navigate = app.convertHrefToNavigateObject[href as ConvertableHref];
    console.log('네비게이션 : ', navigate);

    navigation.navigate(navigate[0], navigate[1]);
  } else {
    console.log('매칭 아직 안됨 : ', href);
  }
}
