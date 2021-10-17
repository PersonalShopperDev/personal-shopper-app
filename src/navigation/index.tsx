import React, { useState } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRecoilState } from 'recoil';
import AppLoading from 'expo-app-loading';

import { authAtom } from '../recoils/atoms';
import authStorage from '../storages/auth.storage';

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
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isLoad, setIsLoad] = useState(false);

  const initLoad = async () => {
    // authStorage.set(
    //   'ACCESS_TOKEN',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNDIsImdlbmRlciI6Ik0iLCJ1c2VyVHlwZSI6IkQiLCJlbWFpbCI6InBxZXI5NTQ2QG5hdmVyLmNvbSIsImlhdCI6MTYzNDQ2NTc2NywiZXhwIjoxNjM0NDY5MzY3fQ.2_j8pO8k9XyuAVdX7PmKcEsJ5SCbJcLZHTRQSojKOb4',
    // );
    // authStorage.set(
    //   'REFRESH_TOKEN',
    //   'SomVGzTtvmrXabVB/QrKIJCCjSrUnr3FVoMhOYF/NseofDfKelnfTixKWaNGR2793mdTJ0Twg4S0Dg2mSvdtdxTnOwRdjtJiv4NW2HXlEcjTGqiHYD3R/kMWd+JKh+AaV96qt6osiM3x2ciXUvtq/83jeO52tlrEc4UD+NJZQI26kJ0bMZ/06Zu98geV8omCR9vcLmnTWQtYKeXj4PJm5yisnLvBsGjklxDcgSOtUtDDmpkubKSEWfYDwZbbheHLHLbqFArOCyQSSUuA2WeGGKZlGlBX3kDcYuNDEIe+kVEEaZOVuRyVvU2s8v2nArJhuT2Po1kjHe471Kcw4cDBh5zvWymLubhzpIB1ksJMI0ys2hCm25a0xJgEvQPIiWpd0KztlpxokDqzsKPB7CdCA7NQjccH+FAlBtgisjKXrE3wZhyJdjzBTanPOkX6Rf/cdzIydOjlPPKvcekROGSj4Pi1bc34maP7OTBbtBt/z8TpmLiyLD18fnJvmkio9QRZ',
    // );
    const accessToken = await authStorage.get('ACCESS_TOKEN');
    const refreshToken = await authStorage.get('REFRESH_TOKEN');
    console.log({ accessToken, refreshToken });
    if (accessToken && refreshToken) setAuth({ accessToken, refreshToken });
  };

  if (!isLoad)
    return (
      <AppLoading
        startAsync={initLoad}
        onError={(error) => console.warn(error)}
        onFinish={() => setIsLoad(true)}
      />
    );

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator initialRouteName={auth ? 'Main' : 'Auth'} headerMode="none">
        {Object.entries(screens).map(([key, { component, options }], i) => (
          <Stack.Screen key={i} name={key} component={component} options={options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
