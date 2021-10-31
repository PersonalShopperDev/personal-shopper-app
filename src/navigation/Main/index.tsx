import React from 'react';
import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { BottomTabNavigatorGenerator } from '../../types/navigation';
import { AppDrawerNavigationProps } from '..';

import MatchingNavigator, { MatchingNavigatorOption, MatchingStackParamList } from './Matching';
import ContentsNavigator, { ContentsNavigatorOption, ContentsStackParamList } from './Contents';
import ChattingNavigator, { ChattingNavigatorOption, ChattingStackParamList } from './Chatting';
import StoreNavigator, { StoreNavigatorOption, StoreStackParamList } from './Store';
import MypageNavigator, { MypageNavigatorOption, MypageStackParamList } from './Mypage';
import { navigation } from '../../utils/navigation';

export type MainTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  AppDrawerNavigationProps
>;
export type MainTabParamList = {
  Matching: NavigatorScreenParams<MatchingStackParamList>;
  Chatting: NavigatorScreenParams<ChattingStackParamList>;
  Contents: NavigatorScreenParams<ContentsStackParamList>;
  Store: NavigatorScreenParams<StoreStackParamList>;
  Mypage: NavigatorScreenParams<MypageStackParamList>;
};

// tab menu visible only root screen
const { BottomTab, screens } = BottomTabNavigatorGenerator<MainTabParamList>({
  Matching: {
    component: MatchingNavigator,
    options: MatchingNavigatorOption,
  },
  Contents: {
    component: ContentsNavigator,
    options: ContentsNavigatorOption,
  },
  Chatting: {
    component: ChattingNavigator,
    options: ChattingNavigatorOption,
  },
  Store: {
    component: StoreNavigator,
    options: StoreNavigatorOption,
  },
  Mypage: {
    component: MypageNavigator,
    options: MypageNavigatorOption,
  },
});

export default function MainNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      {Object.entries(screens).map(([key, { component, options }], i) => (
        <BottomTab.Screen
          key={i}
          name={key}
          component={component}
          options={{
            ...options,
            tabBarVisible: navigation.current
              ? [options.initialRouteName, key].includes(
                  navigation.current.getCurrentRoute()?.name || '',
                )
              : true,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
