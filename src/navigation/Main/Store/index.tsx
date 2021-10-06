import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { createBottomTabOption, StackNavigatorGenerator } from '../../../types/navigation';
import { MainTabNavigationProps } from '../index';

import navStoreGrayIcon from '../../../../public/assets/icons/nav.store.gray.icon.png';
import navStoreBlackIcon from '../../../../public/assets/icons/nav.store.black.icon.png';

import StoreScreen, {
  StoreScreenOptions,
  StoreScreenParams,
} from '../../../components/screens/main/store/Store.screen';

export const StoreNavigatorOption = createBottomTabOption({
  icons: [navStoreBlackIcon, navStoreGrayIcon],
  text: '스토어',
  initialRouteName: 'StoreScreen',
});

export type StoreStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<StoreStackParamList>,
  MainTabNavigationProps
>;
export type StoreStackParamList = {
  StoreScreen: StoreScreenParams;
};

const { Stack, screens } = StackNavigatorGenerator<StoreStackParamList>({
  StoreScreen: {
    component: StoreScreen,
    options: StoreScreenOptions,
  },
});

export default () => (
  <Stack.Navigator initialRouteName={'StoreScreen'}>
    {Object.entries(screens).map(([key, { component, options }], i) => (
      <Stack.Screen key={i} name={key} component={component} options={options} />
    ))}
  </Stack.Navigator>
);
