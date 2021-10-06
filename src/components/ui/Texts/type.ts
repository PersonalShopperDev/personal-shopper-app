import React from 'react';
import { TextProps } from 'react-native';

export interface DefaultTextProp extends TextProps {
  children?: React.ReactNode;
  fixed?: boolean;
}
