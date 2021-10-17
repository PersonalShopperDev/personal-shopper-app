import React, { forwardRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
