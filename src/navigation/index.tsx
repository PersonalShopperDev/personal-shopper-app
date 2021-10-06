import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorGenerator } from '../types/navigation';
import MainNavigator, { MainTabParamList } from './Main';
import AuthNavigator, { AuthStackParamList } from './Auth';

import { navigation } from '../utils/navigation';

export type AppStackNavigationProps = StackNavigationProp<AppStackParamList>;
export type AppStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

const { Stack, screens } = StackNavigatorGenerator<AppStackParamList>({
  Main: {
    component: MainNavigator,
    options: { animationEnabled: false },
  },
  Auth: {
    component: AuthNavigator,
    options: { animationEnabled: false },
  },
});

export default function Navigation() {
  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        {Object.entries(screens).map(([key, { component, options }], i) => (
          <Stack.Screen key={i} name={key} component={component} options={options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
