import { ViewProps } from 'react-native';

export interface ScreenProps {
  children: JSX.Element;
}

export interface ContentsScreenProps extends ViewProps {
  children: JSX.Element;
  isScroll?: boolean;
}
