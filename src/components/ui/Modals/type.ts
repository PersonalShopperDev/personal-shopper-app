import { ModalProps } from 'react-native';

export interface BaseModalProps extends ModalProps {
  title: string;
  text: string;
}
export interface BaseModalRef {
  show: (callback: () => void) => void;
}
