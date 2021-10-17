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

export const SearchScreenOptions = createStackOption({ headerTitle: '스타일검색' });
export type SearchScreenParams = ScreenParams<undefined>;
export default function SearchScreen({
  navigation,
}: ScreenProps<MatchingStackParamList, 'SearchScreen', MatchingStackNavigationProps>) {
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

  // ?type=21%7C51

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={'/users/search'} />}
    />
  );
}
