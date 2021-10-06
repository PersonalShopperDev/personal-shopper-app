import React from 'react';
import { View } from 'react-native';

import { FlexRowViewProps } from './type';

export function FlexRowView({ children, ...props }: FlexRowViewProps) {
  return (
    <View
      {...props}
      style={[{ flexDirection: 'row', width: '100%', justifyContent: 'center' }, props.style]}
    >
      {children}
    </View>
  );
}

export * from './type';
