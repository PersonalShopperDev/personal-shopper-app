import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { RecoilRoot } from 'recoil';

import Navigation from './src/navigation';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </RecoilRoot>
  );
};
