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

export const PrivacyPolicyScreenOptions = createStackOption({ headerTitle: '개인정보처리방침' });
export type PrivacyPolicyScreenParams = ScreenParams<undefined>;
export default function PrivacyPolicyScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'PrivacyPolicyScreen', MatchingStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
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
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={`/term/service`} />}
    />
  );
}
