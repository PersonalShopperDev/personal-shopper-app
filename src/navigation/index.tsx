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
import { profileAtom } from '../recoils/atoms/profile';
import { getProfile } from '../services/profile';
import { getPushNotificationsAsync } from '../utils/pushNotification.util';
import { putPushToken } from '../services/login';

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
  const [profile, setProfile] = useRecoilState(profileAtom);
  const [isLoad, setIsLoad] = useState(false);

  const initLoad = async () => {
    const accessToken = await authStorage.get('ACCESS_TOKEN');
    const refreshToken = await authStorage.get('REFRESH_TOKEN');

    if (accessToken && refreshToken) {
      console.log('[INFO] already login!', accessToken);
      const profile = await getProfile(accessToken);
      if (profile !== undefined) {
        console.log('[INFO] verify token!');

        // 서버에 추가
        const pushToken = await getPushNotificationsAsync();
        putPushToken(accessToken, { token: pushToken });
        console.log({ pushToken });

        setProfile(profile);
        setAuth({ accessToken, refreshToken });
      } else {
        console.log('[INFO] expiration token!');
        authStorage.removeAll();
      }
    } else {
      console.log('[INFO] not login!');
    }
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
