import React, { useEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';
import { Profile } from '../../../ui/Profiles';
import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';

export const IntroScreenOptions = createStackOption({ headerTitle: '스타일매칭' });
export type IntroScreenParams = ScreenParams<undefined>;
export default function IntroScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'IntroScreen', MatchingStackNavigationProps>) {
  useEffect(() => {
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
