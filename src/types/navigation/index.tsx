import { CompositeNavigationProp } from '@react-navigation/core';
import { NavigationProp as RNNavigationProp } from '@react-navigation/native';

export * from './bottomTabNavigator.type';
export * from './stackNavigator.type';

export type ParamList = Record<string, Record<string, unknown> | undefined>;
type RouteProp<P extends ParamList, R extends keyof P> = Readonly<{
  key: string;
  name: R;
}> &
  (undefined extends P[R]
    ? Readonly<{
        params?: Readonly<P[R]> | undefined;
      }>
    : Readonly<{
        params: Readonly<P[R]>;
      }>);
type NavigationProp<
  P extends ParamList,
  N extends RNNavigationProp<P> | undefined = undefined,
> = N extends RNNavigationProp<P>
  ? Readonly<CompositeNavigationProp<N, RNNavigationProp<P>>>
  : Readonly<RNNavigationProp<P>>;

export type ScreenProps<
  P extends ParamList,
  R extends keyof P,
  N extends RNNavigationProp<P> | undefined = undefined,
> = {
  navigation: NavigationProp<P, N>;
  route: RouteProp<P, R>;
};

export type ScreenParams<T extends {} | undefined> = T extends undefined ? {} | T : T;
