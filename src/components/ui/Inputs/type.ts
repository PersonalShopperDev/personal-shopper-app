import { TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  children?: React.ReactNode;
  fixed?: boolean;
}
