import React, { useEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';
import { Profile } from '../../../ui/Profiles';

export const MatchingScreenOptions = createStackOption({ headerTitle: '스타일매칭' });
export type MatchingScreenParams = ScreenParams<undefined>;
export default function MatchingScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'MatchingScreen', MatchingStackNavigationProps>) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Profile
          onPress={() => {
            console.log('drawer open!');
          }}
        />
      ),
    });
  }, []);
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri="/" />}
    />
  );
}
