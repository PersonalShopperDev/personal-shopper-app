import { ViewProps } from 'react-native';
export interface BasicCenterProps extends ViewProps {
  contents: JSX.Element;
  isScroll?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
}
