import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';

import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';

export const IntroScreenOptions = createStackOption({ headerTitle: '서비스 소개' });
export type IntroScreenParams = ScreenParams<undefined>;
export default function IntroScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'IntroScreen', MatchingStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={24} name="close" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/intro'} />}
    />
  );
}
