import { ViewProps } from 'react-native';
export interface BasicTopProps extends ViewProps {
  contents: JSX.Element | JSX.Element[];
  isScroll?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
}
