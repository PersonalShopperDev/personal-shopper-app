import React, { useState } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useRecoilState } from 'recoil';
import AppLoading from 'expo-app-loading';

import { authAtom } from '../recoils/atoms';
import authStorage from '../storages/auth.storage';

import { DrawerNavigatorGenerator } from '../types/navigation';
import MainNavigator, { MainTabParamList } from './Main';
import AuthNavigator, { AuthStackParamList } from './Auth';

import { navigation } from '../utils/navigation';

import { LoggedDrawer } from '../components/ui/Drawers';
import { Text } from '../components/ui/Texts';

export type AppDrawerNavigationProps = DrawerNavigationProp<AppDrawerParamList>;
export type AppDrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

// Drawer
const { Drawer, screens } = DrawerNavigatorGenerator<AppDrawerParamList>({
  Main: {
    component: MainNavigator,
    options: { swipeEnabled: false },
  },
  Auth: {
    component: AuthNavigator,
    options: { swipeEnabled: false },
  },
});

export default function Navigation() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isLoad, setIsLoad] = useState(false);

  const initLoad = async () => {
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
      <Drawer.Navigator
        drawerPosition="right"
        drawerType="front"
        drawerContent={LoggedDrawer}
        initialRouteName={auth ? 'Main' : 'Auth'}
      >
        {Object.entries(screens).map(([key, { component, options }], i) => (
          <Drawer.Screen key={i} name={key} component={component} options={options} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
