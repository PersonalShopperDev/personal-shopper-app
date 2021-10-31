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
    authStorage.set(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkwNCwiZ2VuZGVyIjoiTSIsInVzZXJUeXBlIjoiRCIsImVtYWlsIjpudWxsLCJpYXQiOjE2MzU2Nzc4MjgsImV4cCI6MTYzNTY4MTQyOH0.kD8i0_ZkgNf5fz9pBLvtvvtcm-ArsNXvP4YJWzZDN20',
    );
    authStorage.set(
      'REFRESH_TOKEN',
      'Dc3Oig/cH9Mwnko3GN/T7EGSecHW6KyyybJqNOuucWyOaepjf8oMKgbDqFOGlbWcHAdMKVAwUSWF5ttt95gC7Z9NJHxuPpDXGoL6B9l5/5fk4on3ND2Bwx6/4aChzU/xlp5OOQwhsdzF1QjwZK50W0v56wWEpGxDQiORbayXS6727A/SuZosok8Rjlf44f+7msGjIlct2L3XBAMallk1Q3lsZDX9XZKsqrUcEg1TrcNW4g1Fq/yALoWCUqVeI9kzPNgFr7wbZQJhv9uuekpRAtyy0cd+/Jwtn1nnqueR/yixUU8vB8xDidRVDg+7pJS5M1/Bxa5OB5fnLodeA+xLb9sxvWfrVE6jVLJONSMFvsALUn2YsFUwnIlfj5ooaj/CcAVEGYOflDP6xBp6ipOKgmgbaZc89D1WodChdVgjhClA9CUpmH+aUi5do9dHrWB5lynNPXOQpD6gZeDJYfozb5aiGChHMRUJqs3xIoHR+sTYQuVdcKSXMEkO78m1ocQR',
    );
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
