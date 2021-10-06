import { NavigationProp } from '@react-navigation/core';
import { WebViewProps } from 'react-native-webview';
import { app } from '../../../../constants';
import { AppStackNavigationProps } from '../../../../navigation';

export interface WebViewScreenProps extends WebViewProps {
  uri: keyof typeof app.convertHrefToNavigateObject;
}

export interface convertHrefToNavigateProps {
  href: string;
  navigation: AppStackNavigationProps;
}
