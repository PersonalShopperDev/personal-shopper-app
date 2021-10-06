import React from 'react';
import { TextInput as RnTextInput } from 'react-native';

import { colors } from '../../../constants';

import { TextInputProps } from './type';

export function TextInput({ children, fixed = false, ...props }: TextInputProps) {
  return (
    <RnTextInput
      allowFontScaling={!fixed}
      {...props}
      style={[
        {
          fontSize: 14,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderColor: colors.mainColor,
          borderWidth: 2,
          borderRadius: 4,
          color: colors.black,
        },
        props.style,
      ]}
    >
      {children}
    </RnTextInput>
  );
}

export function ValidateTextInput({ children, ...props }: TextInputProps) {
  return <TextInput {...props}>{children}</TextInput>;
}

export * from './type';
