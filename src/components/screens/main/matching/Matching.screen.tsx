import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';
import { Avatar } from '../../../ui/Avatars';
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';

export const MatchingScreenOptions = createStackOption({ headerTitle: '스타일매칭' });
export type MatchingScreenParams = ScreenParams<undefined>;
export default function MatchingScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'MatchingScreen', MatchingStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 16 }}>
          <Avatar onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>
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
