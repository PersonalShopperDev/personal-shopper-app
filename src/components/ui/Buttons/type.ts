import { TextStyle } from 'react-native';
import { DefaultTextProp } from '../Texts';
import { TouchableOpacityProps } from '../Touchables';

export interface TextButtonProps extends TouchableOpacityProps {
  text: string;
  textProps?: DefaultTextProp;
}

export interface TextLinkButtonProps extends DefaultTextProp {
  text: string;
}

export interface ListItemButtonProps extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
  rightContents?: React.ReactNode;
}
