import React from 'react';
import { Text as RnText } from 'react-native';

import { colors } from '../../../constants';

import { DefaultTextProp } from './type';

export function Text({ fixed = false, ...props }: DefaultTextProp) {
  return (
    <RnText
      allowFontScaling={!fixed}
      {...props}
      style={[{ fontSize: 16, color: colors.black }, props.style]}
    ></RnText>
  );
}

export function Title({ children, fixed = false, ...props }: DefaultTextProp) {
  return (
    <RnText
      allowFontScaling={!fixed}
      {...props}
      style={[{ fontSize: 25, color: colors.black, fontWeight: 'bold' }, props.style]}
    >
      {children}
    </RnText>
  );
}

export * from './type';
