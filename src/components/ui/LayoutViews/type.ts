import { ViewProps } from 'react-native';

export interface FlexRowViewProps extends ViewProps {
  children?: React.ReactNode;
}

export type IfContainerProps<ContainerProps extends {}> = {
  Container: (props: ContainerProps) => JSX.Element;
  children: React.ReactNode;
  isWrap: boolean;
} & ContainerProps;

export interface ItemRowViewProps extends ViewProps {
  children?: React.ReactNode;
  onPress?: () => void;
}
