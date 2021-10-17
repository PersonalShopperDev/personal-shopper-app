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
} from '../../../components/screens/main/common/profile.screen';

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
});

export default () => (
  <Stack.Navigator initialRouteName={'ChattingListScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
