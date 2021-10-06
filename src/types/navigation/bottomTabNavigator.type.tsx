import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import { ParamList } from './index';

import { colors } from '../../constants';

import { Text } from '../../components/ui/Texts';
import { CustomIcon, CustomIconSourceProp } from '../../components/ui/Icons';
import { navigation } from '../../utils/navigation';

type BottomTabNavigatorScreenProps = {
  component: () => JSX.Element;
  options: BottomTabNavigationOptions & { initialRouteName: string };
};
export function BottomTabNavigatorGenerator<
  P extends ParamList,
  O extends Record<string, unknown> = Record<string, unknown>,
>(screens: {
  [K in Readonly<keyof P>]: BottomTabNavigatorScreenProps;
}) {
  return { BottomTab: createBottomTabNavigator<P & O>(), screens };
}

type createBottomTabOptionProps = (props: {
  icons: [CustomIconSourceProp, CustomIconSourceProp];
  text: string;
  initialRouteName: string;
}) => BottomTabNavigationOptions & { initialRouteName: string };
export const createBottomTabOption: createBottomTabOptionProps = ({
  icons,
  text,
  initialRouteName,
}) => ({
  tabBarIcon: ({ focused }) => (
    <CustomIcon source={focused ? icons[0] : icons[1]} style={{ width: 18, height: 18 }} />
  ),
  tabBarLabel: ({ focused }) => (
    <Text style={{ color: focused ? colors.black : colors.gray, fontSize: 10, fontWeight: '500' }}>
      {text}
    </Text>
  ),
  initialRouteName,
});
