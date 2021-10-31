import React from 'react';

import { colors } from '../../../constants';

import { TouchableOpacity } from '../Touchables';

import { Text } from '../Texts';
import { TextButtonProps, TextLinkButtonProps, ListItemButtonProps } from './type';
import { FlexRowView } from '../LayoutViews';

export function TextButton({ text, textProps, ...props }: TextButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingHorizontal: 30,
          paddingVertical: 5,
          borderRadius: 4,
          backgroundColor: colors.mainColor,
        },
        props.style,
      ]}
    >
      <Text {...textProps} style={[{ color: colors.white, fontSize: 16 }, textProps?.style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
export function TextLinkButton({ text, ...props }: TextLinkButtonProps) {
  return (
    <TouchableOpacity>
      <Text {...props}>{text}</Text>
    </TouchableOpacity>
  );
}

export function ListItemButton({ text, rightContents, textStyle, ...props }: ListItemButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <FlexRowView style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={textStyle}>{text}</Text>
        {rightContents}
      </FlexRowView>
    </TouchableOpacity>
  );
}

export * from './type';
