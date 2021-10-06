import React from 'react';
import { View } from 'react-native';

import { BasicCenterProps } from './type';

import { Screen, ContentsScreen } from '../../ui/Screens';

export default function BasicCenter({ contents, isScroll, ...props }: BasicCenterProps) {
  return (
    <Screen>
      <ContentsScreen
        isScroll={isScroll}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View {...props} style={[{ paddingVertical: 8, paddingHorizontal: 8 }, props.style]}>
          {contents}
        </View>
      </ContentsScreen>
    </Screen>
  );
}
