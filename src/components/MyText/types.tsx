import {ReactNode} from 'react';
import {StyleProp, TextStyle} from 'react-native';

export interface TextProps {
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
  size?: 'xm' | 'sm' | 'lg' | 'xl' | '2xl';
  color?: string;
  bold?: boolean | string;
}
