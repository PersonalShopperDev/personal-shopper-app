import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';

export type IconSet = keyof typeof MaterialCommunityIcons['glyphMap'];

export type LogoIconSet = 'default';

export type CustomIconSourceProp = ImageSourcePropType;
