import React from 'react';
import { Image, View } from 'react-native';

import profileImage from '../../../../public/assets/images/profile.image.png';
import { TouchableOpacity } from '../Touchables';

interface ProfileProps {
  onPress: () => void;
}
export function Profile({ onPress }: ProfileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginHorizontal: 15,
        width: 31,
        height: 31,
        borderRadius: 30,
        backgroundColor: '#FFC8B2',
      }}
    >
      <Image
        style={{ position: 'absolute', top: 1, left: 2, width: 25, height: 26 }}
        resizeMode={'contain'}
        source={profileImage}
      />
    </TouchableOpacity>
  );
}
