import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDrawerNavigationProps } from '../index';

import { StackNavigatorGenerator } from '../../types/navigation';

import LoginScreen, {
  LoginScreenOptions,
  LoginScreenParams,
} from '../../components/screens/auth/Login.screen';
import KakaoLoginScreen, {
  KakaoLoginScreenOptions,
  KakaoLoginScreenParams,
} from '../../components/screens/auth/KakaoLogin.screen';
import NaverLoginScreen, {
  NaverLoginScreenOptions,
  NaverLoginScreenParams,
} from '../../components/screens/auth/NaverLogin.screen';

export type AuthStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  AppDrawerNavigationProps
>;
export type AuthStackParamList = {
  LoginScreen: LoginScreenParams;
  KakaoLoginScreen: KakaoLoginScreenParams;
  NaverLoginScreen: NaverLoginScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<AuthStackParamList>({
  LoginScreen: {
    component: LoginScreen,
    options: LoginScreenOptions,
  },
  KakaoLoginScreen: {
    component: KakaoLoginScreen,
    options: KakaoLoginScreenOptions,
  },
  NaverLoginScreen: {
    component: NaverLoginScreen,
    options: NaverLoginScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'LoginScreen'}>
    {Object.entries(screens).map(([key, values], i) => (
      <Stack.Screen key={i} name={key} component={values.component} options={values.options} />
    ))}
  </Stack.Navigator>
);
