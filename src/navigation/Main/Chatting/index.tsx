import React from 'react';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navChatGrayIcon from '../../../../public/assets/icons/nav.chat.gray.icon.png';
import navChatBlackIcon from '../../../../public/assets/icons/nav.chat.black.icon.png';

import ChattingScreen, {
  ChattingScreenOptions,
  ChattingScreenParams,
} from '../../../components/screens/main/chatting/Chatting.screen';

export const ChattingNavigatorOption = createBottomTabOption({
  icons: [navChatBlackIcon, navChatGrayIcon],
  text: '채팅',
  initialRouteName: 'ChattingScreen',
});
export type ChattingStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<ChattingStackParamList>,
  MainTabNavigationProps
>;
export type ChattingStackParamList = {
  ChattingScreen: ChattingScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<ChattingStackParamList>({
  ChattingScreen: {
    component: ChattingScreen,
    options: ChattingScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'ChattingScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
