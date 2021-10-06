import React from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MypageStackParamList,
  MypageStackNavigationProps,
} from '../../../../navigation/Main/Mypage';

export const MypageScreenOptions = createStackOption({ headerShown: false });
export type MypageScreenParams = ScreenParams<undefined>;
export default function MypageScreen({
  navigation,
}: ScreenProps<MypageStackParamList, 'MypageScreen', MypageStackNavigationProps>) {
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/profile'} />}
    />
  );
}
