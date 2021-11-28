import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navMypageGrayIcon from '../../../assets/icons/nav.mypage.gray.icon.png';
import navMypageBlackIcon from '../../../assets/icons/nav.mypage.black.icon.png';

import MypageScreen, {
  MypageScreenOptions,
  MypageScreenParams,
} from '../../../components/screens/main/mypage/Mypage.screen';
import ProfileEditScreen, {
  ProfileEditScreenOptions,
  ProfileEditScreenParams,
} from '../../../components/screens/main/mypage/ProfileEdit.screen';

export const MypageNavigatorOption = createBottomTabOption({
  icons: [navMypageBlackIcon, navMypageGrayIcon],
  text: 'MY프로필',
  initialRouteName: 'MypageScreen',
});

export type MypageStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MypageStackParamList>,
  MainTabNavigationProps
>;
export type MypageStackParamList = {
  MypageScreen: MypageScreenParams;
  ProfileEditScreen: ProfileEditScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<MypageStackParamList>({
  MypageScreen: {
    component: MypageScreen,
    options: MypageScreenOptions,
  },
  ProfileEditScreen: {
    component: ProfileEditScreen,
    options: ProfileEditScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'MypageScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
