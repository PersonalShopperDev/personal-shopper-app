import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { ParamList } from './index';

type DrawerNavigatorScreenProps = {
  component: (props: any) => JSX.Element;
  options: DrawerNavigationOptions;
};

export function DrawerNavigatorGenerator<
  P extends ParamList,
  O extends Record<string, unknown> = Record<string, unknown>,
>(screens: {
  [K in Readonly<keyof P>]: DrawerNavigatorScreenProps;
}) {
  return { Drawer: createDrawerNavigator<P & O>(), screens };
}

type createDrawerOptionProps = (props: DrawerNavigationOptions) => DrawerNavigationOptions;
export const createDrawerOption: createDrawerOptionProps = (props) => props;
