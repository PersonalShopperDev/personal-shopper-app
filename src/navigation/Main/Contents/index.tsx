import React from 'react';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navContentsGrayIcon from '../../../../public/assets/icons/nav.contents.gray.icon.png';
import navContentsBlackIcon from '../../../../public/assets/icons/nav.contents.black.icon.png';

import ContentsScreen, {
  ContentsScreenOptions,
  ContentsScreenParams,
} from '../../../components/screens/main/contents/Contents.screen';

export const ContentsNavigatorOption = createBottomTabOption({
  icons: [navContentsBlackIcon, navContentsGrayIcon],
  text: '패션컨텐츠',
  initialRouteName: 'ContentsScreen',
});
export type ContentsStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<ContentsStackParamList>,
  MainTabNavigationProps
>;
export type ContentsStackParamList = {
  ContentsScreen: ContentsScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<ContentsStackParamList>({
  ContentsScreen: {
    component: ContentsScreen,
    options: ContentsScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'ContentsScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
