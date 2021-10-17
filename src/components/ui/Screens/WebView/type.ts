import { WebViewProps } from 'react-native-webview';
import { AppStackNavigationProps } from '../../../../navigation';

export interface WebViewScreenProps extends WebViewProps {
  uri: string;
}

export interface convertHrefToNavigateProps {
  href: string;
  navigation: AppStackNavigationProps;
}
