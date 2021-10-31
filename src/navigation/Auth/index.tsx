import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDrawerNavigationProps } from '../index';

import { StackNavigatorGenerator } from '../../types/navigation';

import LoginScreen, {
  LoginScreenOptions,
  LoginScreenParams,
} from '../../components/screens/auth/Login.screen';

export type AuthStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  AppDrawerNavigationProps
>;
export type AuthStackParamList = {
  LoginScreen: LoginScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<AuthStackParamList>({
  LoginScreen: {
    component: LoginScreen,
    options: LoginScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'LoginScreen'}>
    {Object.entries(screens).map(([key, values], i) => (
      <Stack.Screen key={i} name={key} component={values.component} options={values.options} />
    ))}
  </Stack.Navigator>
);
