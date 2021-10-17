import { ViewProps } from 'react-native';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
export interface ScreenProps extends NativeSafeAreaViewProps {
  children: JSX.Element;
}

export interface ContentsScreenProps extends ViewProps {
  children: JSX.Element;
  isScroll?: boolean;
}
