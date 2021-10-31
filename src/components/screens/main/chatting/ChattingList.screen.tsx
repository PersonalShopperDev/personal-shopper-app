import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  ChattingStackNavigationProps,
  ChattingStackParamList,
} from '../../../../navigation/Main/Chatting';
import { DrawerActions } from '@react-navigation/routers';
import { View } from 'react-native';
import { Avatar } from '../../../ui/Avatars';

export const ChattingListScreenOptions = createStackOption({ headerTitle: '채팅' });
export type ChattingListScreenParams = ScreenParams<undefined>;
export default function ChattingListScreen({
  navigation,
}: ScreenProps<ChattingStackParamList, 'ChattingListScreen', ChattingStackNavigationProps>) {
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
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/chat'} />}
    />
  );
}
