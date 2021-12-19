import { useHeaderHeight } from '@react-navigation/stack';
import React, { forwardRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../constants';

import { ScreenProps, ContentsScreenProps } from './type';

export function Screen({ children, ...props }: ScreenProps) {
  return (
    <SafeAreaView {...props} style={[{ flex: 1, backgroundColor: colors.white }, props.style]}>
      {children}
    </SafeAreaView>
  );
}

export function ContentsScreen({ children, isScroll = false, ...props }: ContentsScreenProps) {
  const { bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const Contents = isScroll ? (
    <ScrollView
      style={{ width: '100%' }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
    >
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  );

  // Platform.OS === 'ios'
  return true ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight - bottom}
      behavior={'padding'}
      {...props}
    >
      {Contents}
    </KeyboardAvoidingView>
  ) : (
    <>{Contents}</>
  );
}

export * from './WebView';
export * from './type';
