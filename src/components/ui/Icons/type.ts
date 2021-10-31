import { ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconProps as ExpoIconProps } from '@expo/vector-icons/build/createIconSet';

export type IconSet = keyof typeof MaterialCommunityIcons['glyphMap'];

export type LogoIconSet = 'default';

export type CustomIconSourceProp = ImageSourcePropType;

export type IconProps = ExpoIconProps<IconSet>;
