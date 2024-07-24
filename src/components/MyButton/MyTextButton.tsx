import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent, ReactNode} from 'react';
import MyText from '../MyText/MyText';
// import styled from 'styled-components/native';

interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void | undefined; // Make margin prop optional
  children?: ReactNode;
}

const MyTextButton: FunctionComponent<ButtonProps> = props => {
  return (
    <TouchableOpacity
      style={[props.btnStyles, styles.btn]}
      onPress={props.onPress}>
      <MyText size="sm" textStyle={[props.textStyles]}>
        {props.children}
      </MyText>
    </TouchableOpacity>
  );
};

export default MyTextButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  btnBlueGradiant: {
    color: 'white',
  },
  orangeGradient: {},
});
