import {StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {TextProps} from './types';

const MyText: FunctionComponent<TextProps> = props => {
  let fontSize =
    props.size === 'xm'
      ? 15
      : props.size === 'sm'
      ? 20
      : props.size === 'lg'
      ? 30
      : props.size === 'xl'
      ? 40
      : 12;
  return (
    <Text
      style={[
        {
          color: props.color ?? 'black',
          fontSize: fontSize,
          fontWeight: props.bold
            ? 'bold'
            : props.bold == 'md'
            ? '400'
            : 'normal',
        },
        styles.textStyle,
        props.textStyle,
      ]}>
      {props.children}
    </Text>
  );
};

export default MyText;

const styles = StyleSheet.create({
  textStyle: {},
});
