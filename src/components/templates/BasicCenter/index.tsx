import React from 'react';
import { View } from 'react-native';

import { BasicCenterProps } from './type';

import { Screen, ContentsScreen } from '../../ui/Screens';
import { useHeaderHeight } from '@react-navigation/stack';

export default function BasicCenter({ contents, isScroll, ...props }: BasicCenterProps) {
  const headerHeight = useHeaderHeight();
  return (
    <Screen edges={headerHeight ? ['left', 'right'] : ['left', 'right', 'top']}>
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
