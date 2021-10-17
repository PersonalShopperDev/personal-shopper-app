import React, { useLayoutEffect } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';
import { Profile } from '../../../ui/Profiles';
import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';
import { FlexRowView } from '../../../ui/LayoutViews';

export const ShopperScreenOptions = createStackOption({ headerTitle: '쇼퍼' });
export type ShopperScreenParams = ScreenParams<undefined>;
export default function ShopperScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'ShopperScreen', MatchingStackNavigationProps>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <FlexRowView style={{ paddingHorizontal: 12 }}>
          <TouchableOpacity style={{ marginRight: 6 }} onPress={() => navigation.goBack()}>
            <Icon size={24} name="account-search" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon size={24} name="filter" />
          </TouchableOpacity>
        </FlexRowView>
      ),
    });
  }, []);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/users/shopper'} />}
    />
  );
}
