import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MypageStackParamList,
  MypageStackNavigationProps,
} from '../../../../navigation/Main/Mypage';

export const MypageScreenOptions = createStackOption({
  headerTitle: 'My 프로필',
  headerTitleAlign: 'left',
});
export type MypageScreenParams = ScreenParams<undefined>;
export default function MypageScreen({}: ScreenProps<
  MypageStackParamList,
  'MypageScreen',
  MypageStackNavigationProps
>) {
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <WebViewScreenOnlyMain
          style={{ flex: 1 }}
          uri={'/profile'}
          injectedJavaScript={`
            const styleSheet2 = document.createElement("style")
            styleSheet2.type = "text/css"
            styleSheet2.innerText = ".header_title__3L0mv { display: none; }"
            document.head.appendChild(styleSheet2)
          `}
        />
      }
    />
  );
}
