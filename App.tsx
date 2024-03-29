import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { RecoilRoot } from 'recoil';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Navigation from './src/navigation';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      {/* <StatusBar barStyle={'light-content'} /> */}
      <ActionSheetProvider>
        <Navigation />
      </ActionSheetProvider>
    </RecoilRoot>
  );
};
