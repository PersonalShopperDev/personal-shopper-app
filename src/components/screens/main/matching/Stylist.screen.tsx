import React, { useLayoutEffect, useMemo,  useEffect } from 'react';
import { ActionSheetProps, connectActionSheet } from '@expo/react-native-action-sheet';
import { stringifyUrl } from 'query-string';

import { Icon } from '../../../ui/Icons';
import { FlexRowView } from '../../../ui/LayoutViews';
import BasicCenter from '../../../templates/BasicCenter';
import { TouchableOpacity } from '../../../ui/Touchables';
import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import {
  MatchingStackParamList,
  MatchingStackNavigationProps,
} from '../../../../navigation/Main/Matching';




export const StylistScreenOptions = createStackOption({ headerTitle: '스타일리스트' });
export type StylistScreenParams = ScreenParams<{
  type?: string;
  sort?: 'recommend' | 'hireCount' | 'priceLow' | 'professional';
}>;
function StylistScreen({
  route: { params },
  navigation,
  showActionSheetWithOptions,
}: ScreenProps<MatchingStackParamList, 'StylistScreen', MatchingStackNavigationProps> &
  ActionSheetProps) {

  const sort = useMemo(() => params?.sort || 'recommend', [params?.sort]);
  const type = useMemo(() => params?.type, [params?.type]);

  const uri = useMemo(
    () => stringifyUrl({ url: '/users/stylist', query: { sort, type } }),
    [sort, type],
  );

  const styleListSortTypeLabel = ['추천순', '고용순', '저가순', '전문 스타일리스트', '취소'];
  const styleListSortType = ['recommend', 'hireCount', 'priceLow', 'professional'];

  const onPressSort = () =>
    showActionSheetWithOptions(
      { options: styleListSortTypeLabel, cancelButtonIndex: styleListSortTypeLabel.length - 1 },
      (selectIndex) => {
        if (selectIndex !== undefined && [0, 1, 2, 3].includes(selectIndex)) {
          navigation.setParams({ sort: styleListSortType[selectIndex] });
        }
      },
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <FlexRowView style={{ paddingHorizontal: 12 }}>
          <TouchableOpacity
            style={{ marginRight: 6 }}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Icon size={24} name="account-search" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSort}>
            <Icon size={24} name="filter" />
          </TouchableOpacity>
        </FlexRowView>
      ),
    });
  }, []);


  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain style={{ flex: 1 }} uri={uri} />}
    />
  );
}

export default connectActionSheet(StylistScreen);
