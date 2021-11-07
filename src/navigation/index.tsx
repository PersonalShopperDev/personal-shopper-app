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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkwNCwiZ2VuZGVyIjoiTSIsInVzZXJUeXBlIjoiRCIsImVtYWlsIjoiaW5zdW5nOTU0NkBnbWFpbC5jb20iLCJpYXQiOjE2MzYyODQxNDksImV4cCI6MTYzNjI4Nzc0OX0.LVCvYXjNeSxPhVIRhV_ijeATVEaaz4mQjvH6XkxwnIQ',
    );
    authStorage.set(
      'REFRESH_TOKEN',
      '7YP1m4GItElzFLDR23J9YUQJWTMmlqYFPXLWrBZB1qEI+g0/ECb7cjW89KRgezUipNDToinPy1lpOduku0UMrf/TULLFarHWf2CiMMkzmzcuZ9meS5l3pFOJT5QTNpsHHC+TnXIIS59Uao5+K/9mR/+iC/23cm9r7FiE2GiqV8W+m8jYYeY8Rw4puYw5WUqLNKKyxH+5nnWAixa1T3XdlsPOsVImeI6B9GodCIBr23jUTCxFS2Jnecn+hvGSb9+2DBEKYNHQxv4pW8GCeqwdh5CiaJhH0+h5ErOtxqMWxba9cShhP+6Nrt1ax1wx1fwyQudXfvWf6viGzwufRPA+Kou3o3OmK8LKxbvd6vgP7OUFk8UBM62GMFnvoVTu+pZaL6EtvEaE0Yc7wDHcYlCH/ZavyMTbIu5SIucKqqHiR0rchw2edixBwqsXgMJWsru74D5vN2PPdbqbDOrBwjl2VyUY2hP241f2kNSxaehISpweX7mPc2pFS0PAQVBJbZea',
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
