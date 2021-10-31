import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from '../Touchables';

import { FlexRowViewProps, ItemRowViewProps, IfContainerProps } from './type';

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

export function IfContainer<ContainerProps extends {}>({
  children,
  Container,
  isWrap,
  ...props
}: IfContainerProps<ContainerProps>) {
  return isWrap ? <Container {...(props as any)}>{children}</Container> : <>{children}</>;
}

export function ItemRowView({ children, onPress, ...props }: ItemRowViewProps) {
  return (
    <IfContainer onPress={onPress} Container={TouchableOpacity} isWrap={Boolean(onPress)}>
      <FlexRowView {...props}>{children}</FlexRowView>
    </IfContainer>
  );
}

export * from './type';
