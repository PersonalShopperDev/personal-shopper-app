import React, { useEffect, useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';
import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';

export const ProfileScreenOptions = createStackOption({ headerTitle: '프로필' });
export type ProfileScreenParams = ScreenParams<{ id: number }>;
export default function ProfileScreen({
  route: {
    params: { id },
  },
  navigation,
}: ScreenProps<MatchingStackParamList, 'ProfileScreen', MatchingStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
      headerRight: () => null,
    });
  }, []);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <WebViewScreenOnlyMain
          style={{ flex: 1 }}
          uri={`/profile/${id}`}
          injectedJavaScript={`
        const styleSheet2 = document.createElement("style")
        styleSheet2.type = "text/css"
        styleSheet2.innerText = ".default_bottom__2cPWr { display: block; }"
        document.head.appendChild(styleSheet2)
      `}
        />
      }
    />
  );
}
