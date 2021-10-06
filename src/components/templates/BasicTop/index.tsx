import React from 'react';
import { View } from 'react-native';

import { Screen, ContentsScreen } from '../../ui/Screens';
import { LogoIcon } from '../../ui/Icons';

import { BasicTopProps } from './type';

export default function BasicTop({ contents, isScroll, ...props }: BasicTopProps) {
  return (
    <Screen>
      <ContentsScreen
        isScroll={isScroll}
        style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <View style={[{ flex: 1, paddingVertical: 8, paddingHorizontal: 8 }, props.style]}>
          {contents}
        </View>
      </ContentsScreen>
    </Screen>
  );
}

export function LogoWithBasicTop(props: BasicTopProps) {
  return (
    <BasicTop
      {...props}
      style={[{ alignItems: 'center' }, props.style]}
      contents={
        <>
          <View style={{ paddingVertical: 80 }}>
            <LogoIcon name={'default'} />
          </View>
          {props.contents}
        </>
      }
    />
  );
}
