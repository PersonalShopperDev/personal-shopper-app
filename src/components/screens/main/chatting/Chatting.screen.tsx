import React from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';

export const ChattingScreenOptions = createStackOption({ headerTitle: '채팅' });
export type ChattingScreenParams = undefined;
export default function ChattingScreen() {
  // 홈 화면 입니다.

  // 일단 토큰이 없는 상황에서만 이렇게 뜨고 토큰이 있다는걸 어떻게 넘겨줄까요?

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/chat'} />}
    />
  );
}
