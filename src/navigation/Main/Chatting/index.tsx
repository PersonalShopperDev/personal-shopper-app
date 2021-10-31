import React from 'react';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navChatGrayIcon from '../../../../public/assets/icons/nav.chat.gray.icon.png';
import navChatBlackIcon from '../../../../public/assets/icons/nav.chat.black.icon.png';

import ChattingListScreen, {
  ChattingListScreenOptions,
  ChattingListScreenParams,
} from '../../../components/screens/main/chatting/ChattingList.screen';
import ChattingScreen, {
  ChattingScreenOptions,
  ChattingScreenParams,
} from '../../../components/screens/main/chatting/Chatting.screen';

import ProfileScreen, {
  ProfileScreenOptions,
  ProfileScreenParams,
} from '../../../components/screens/main/common/Profile.screen';
import HistoryScreen, {
  HistoryScreenOptions,
  HistoryScreenParams,
} from '../../../components/screens/main/common/History.screen';
import PrivacyPolicyScreen, {
  PrivacyPolicyScreenOptions,
  PrivacyPolicyScreenParams,
} from '../../../components/screens/main/common/PrivacyPolicy.Screen';
import TermsOfServiceScreen, {
  TermsOfServiceScreenOptions,
  TermsOfServiceScreenParams,
} from '../../../components/screens/main/common/TermsOfService.screen';

export const ChattingNavigatorOption = createBottomTabOption({
  icons: [navChatBlackIcon, navChatGrayIcon],
  text: '채팅',
  initialRouteName: 'ChattingListScreen',
});
export type ChattingStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<ChattingStackParamList>,
  MainTabNavigationProps
>;
export type ChattingStackParamList = {
  ChattingListScreen: ChattingListScreenParams;
  ChattingScreen: ChattingScreenParams;
  ProfileScreen: ProfileScreenParams;
  HistoryScreen: HistoryScreenParams;
  PrivacyPolicyScreen: PrivacyPolicyScreenParams;
  TermsOfServiceScreen: TermsOfServiceScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<ChattingStackParamList>({
  ChattingListScreen: {
    component: ChattingListScreen,
    options: ChattingListScreenOptions,
  },
  ChattingScreen: {
    component: ChattingScreen,
    options: ChattingScreenOptions,
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: ProfileScreenOptions,
  },
  HistoryScreen: {
    component: HistoryScreen,
    options: HistoryScreenOptions,
  },
  PrivacyPolicyScreen: {
    component: PrivacyPolicyScreen,
    options: PrivacyPolicyScreenOptions,
  },
  TermsOfServiceScreen: {
    component: TermsOfServiceScreen,
    options: TermsOfServiceScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'ChattingListScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
