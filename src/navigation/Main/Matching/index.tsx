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
});

export default () => (
  <Stack.Navigator initialRouteName={'MatchingScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
