import React, { forwardRef } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { colors } from '../../../constants';

import { ScreenProps, ContentsScreenProps } from './type';

export function Screen({ children }: ScreenProps) {
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>{children}</SafeAreaView>;
}

export function ContentsScreen({ children, isScroll = false, ...props }: ContentsScreenProps) {
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

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView keyboardVerticalOffset={46} behavior={'padding'} {...props}>
      {Contents}
    </KeyboardAvoidingView>
  ) : (
    <>{Contents}</>
  );
}

export * from './WebView';
export * from './type';
