import React from 'react';
import { TouchableOpacity as RnTouchableOpacity } from 'react-native';

import { TouchableOpacityProps } from './type';

export function TouchableOpacity({ children, ...props }: TouchableOpacityProps) {
  return (
    <RnTouchableOpacity activeOpacity={0.5} {...props}>
      {children}
    </RnTouchableOpacity>
  );
}

export * from './type';
