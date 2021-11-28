import React, { useLayoutEffect } from 'react';

import BasicCenter from '../../../templates/BasicCenter';
import { Icon } from '../../../ui/Icons';
import { WebViewScreenOnlyMain } from '../../../ui/Screens';
import { TouchableOpacity } from '../../../ui/Touchables';

import {
  ChattingStackNavigationProps,
  ChattingStackParamList,
} from '../../../../navigation/Main/Chatting';
import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';

export const PayScreenOptions = createStackOption({ headerTitle: '결제' });
export type PayScreenParams = ScreenParams<{ id: number }>;
export default function PayScreen({
  route: {
    params: { id },
  },
  navigation,
}: ScreenProps<ChattingStackParamList, 'PayScreen', ChattingStackNavigationProps>) {
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
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={`/pay/${id}`} />}
    />
  );
}
