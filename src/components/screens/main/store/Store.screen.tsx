import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '../../../ui/Texts';
import BasicCenter from '../../../templates/BasicCenter';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import { StoreStackParamList, StoreStackNavigationProps } from '../../../../navigation/Main/Store';

import storeImage from '../../../../../public/assets/images/store.image.png';

export const StoreScreenOptions = createStackOption({ headerShown: false });
export type StoreScreenParams = ScreenParams<undefined>;
export default function StoreScreen({}: ScreenProps<
  StoreStackParamList,
  'StoreScreen',
  StoreStackNavigationProps
>) {
  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '50%' }} resizeMode={'contain'} source={storeImage} />
          <Text style={{ fontWeight: 'bold' }}>해당 서비스는 준비중입니다.</Text>
        </View>
      }
    />
  );
}
