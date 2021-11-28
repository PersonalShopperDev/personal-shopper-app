import React from 'react';
import { Image, TouchableNativeFeedbackBase, View } from 'react-native';

import { TouchableOpacity } from '../Touchables';

import avatarImage from '../../../assets/images/profile.image.png';

import { AvatarProps } from './type';
import { IfContainer } from '../LayoutViews';

export function Avatar({ size = 30, onPress }: AvatarProps) {
  const viewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#FFC8B2',
  };

  return (
    <IfContainer
      Container={TouchableOpacity}
      isWrap={Boolean(onPress)}
      style={viewStyle}
      onPress={onPress}
    >
      <View style={viewStyle}>
        <Image
          style={{
            position: 'absolute',
            top: size * (1 / 30),
            left: size * (2 / 30),
            width: size * (25 / 30),
            height: size * (26 / 30),
          }}
          resizeMode={'contain'}
          source={avatarImage}
        />
      </View>
    </IfContainer>
  );
}
