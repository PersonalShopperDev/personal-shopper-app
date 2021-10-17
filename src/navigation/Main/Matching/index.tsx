import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navMatchingGrayIcon from '../../../../public/assets/icons/nav.matching.gray.icon.png';
import navMatchingBlackIcon from '../../../../public/assets/icons/nav.matching.black.icon.png';

import MatchingScreen, {
  MatchingScreenOptions,
  MatchingScreenParams,
} from '../../../components/screens/main/matching/Matching.screen';
import IntroScreen, {
  IntroScreenOptions,
  IntroScreenParams,
} from '../../../components/screens/main/matching/Intro.screen';
import StylistScreen, {
  StylistScreenOptions,
  StylistScreenParams,
} from '../../../components/screens/main/matching/Stylist.screen';
import ShopperScreen, {
  ShopperScreenOptions,
  ShopperScreenParams,
} from '../../../components/screens/main/matching/Shopper.screen';
import NoticeScreen, {
  NoticeScreenOptions,
  NoticeScreenParams,
} from '../../../components/screens/main/matching/Notice.screen';
import SearchScreen, {
  SearchScreenOptions,
  SearchScreenParams,
} from '../../../components/screens/main/matching/Search.screen';

import ProfileScreen, {
  ProfileScreenOptions,
  ProfileScreenParams,
} from '../../../components/screens/main/common/profile.screen';

export const MatchingNavigatorOption = createBottomTabOption({
  icons: [navMatchingBlackIcon, navMatchingGrayIcon],
  text: '스타일 매칭',
  initialRouteName: 'MatchingScreen',
});

export type MatchingStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MatchingStackParamList>,
  MainTabNavigationProps
>;
export type MatchingStackParamList = {
  MatchingScreen: MatchingScreenParams;
  IntroScreen: IntroScreenParams;
  StylistScreen: StylistScreenParams;
  ShopperScreen: ShopperScreenParams;
  NoticeScreen: NoticeScreenParams;
  ProfileScreen: ProfileScreenParams;
  SearchScreen: SearchScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<MatchingStackParamList>({
  MatchingScreen: {
    component: MatchingScreen,
    options: MatchingScreenOptions,
  },
  IntroScreen: {
    component: IntroScreen,
    options: IntroScreenOptions,
  },
  StylistScreen: {
    component: StylistScreen,
    options: StylistScreenOptions,
  },
  ShopperScreen: {
    component: ShopperScreen,
    options: ShopperScreenOptions,
  },
  NoticeScreen: {
    component: NoticeScreen,
    options: NoticeScreenOptions,
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: ProfileScreenOptions,
  },
  SearchScreen: {
    component: SearchScreen,
    options: SearchScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'MatchingScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
