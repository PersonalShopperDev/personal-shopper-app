import React from 'react';
import { Image, ImageProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

import { IconSet, LogoIconSet } from './type';

import AppIcon from '../../../../public/assets/icons/app.icon.png';

export function Icon(props: IconProps<IconSet>) {
  return <MaterialCommunityIcons {...props} />;
}

export function CustomIcon(props: ImageProps) {
  return <Image {...props} />;
}

export function LogoIcon({ name, size = 140 }: { name: LogoIconSet; size?: number }) {
  const logoIconSetObject: Record<LogoIconSet, any> = { default: AppIcon };
  return <Image style={{ width: size, height: size }} source={logoIconSetObject[name]} />;
}

export * from './type';
