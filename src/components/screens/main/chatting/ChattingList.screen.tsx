import React from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';

export const ChattingListScreenOptions = createStackOption({ headerTitle: '채팅' });
export type ChattingListScreenParams = ScreenParams<undefined>;
export default function ChattingListScreen() {
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/chat'} />}
    />
  );
}
