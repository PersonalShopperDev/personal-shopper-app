import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '../../../ui/Texts';
import BasicCenter from '../../../templates/BasicCenter';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import {
  ContentsStackParamList,
  ContentsStackNavigationProps,
} from '../../../../navigation/Main/Contents';

import contentsImage from '../../../../../public/assets/images/contents.image.png';

export const ContentsScreenOptions = createStackOption({ headerShown: false });
export type ContentsScreenParams = ScreenParams<undefined>;
export default function ContentsScreen({}: ScreenProps<
  ContentsStackParamList,
  'ContentsScreen',
  ContentsStackNavigationProps
>) {
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '50%' }} resizeMode={'contain'} source={contentsImage} />
          <Text style={{ fontWeight: 'bold' }}>해당 서비스는 준비중입니다.</Text>
        </View>
      }
    />
  );
}
