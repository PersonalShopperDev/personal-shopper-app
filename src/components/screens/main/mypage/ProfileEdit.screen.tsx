import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MypageStackParamList,
  MypageStackNavigationProps,
} from '../../../../navigation/Main/Mypage';
import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';

export const ProfileEditScreenOptions = createStackOption({ headerTitle: '개인정보' });
export type ProfileEditScreenParams = ScreenParams<undefined>;
export default function ProfileEditScreen({
  navigation,
}: ScreenProps<MypageStackParamList, 'ProfileEditScreen', MypageStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/profile/info'} />}
    />
  );
}
