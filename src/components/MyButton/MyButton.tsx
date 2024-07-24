import {
  Button,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent, ReactNode} from 'react';
import MyText from '../MyText/MyText';
import LottieView from 'lottie-react-native';
// import styled from 'styled-components/native';

interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
  isDisable?: boolean;
  // onPress?: (event: GestureResponderEvent) => void | undefined; // Make margin prop optional
  children?: ReactNode;
  onPress?: () => void;
}

const MyButton: FunctionComponent<ButtonProps> = props => {
  var checkIsDisable = props.isLoading || props.isDisable;
  return (
    <TouchableOpacity
      disabled={checkIsDisable}
      style={[
        props.btnStyles,
        styles.btn,
        {opacity: props.isDisable ? 0.5 : 1},
      ]}
      onPress={props.onPress}>
      {props.isLoading ? (
        <View style={styles.lottieContainer}>
          <LottieView
            style={{...styles.lottie}}
            source={require('../../assets/lottie/dropping-dot-ball-edited.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <MyText size="sm" textStyle={[props.textStyles]}>
          {props.children}
        </MyText>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    // width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    zIndex: -100,
  },
  lottieContainer: {
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  lottie: {
    width: 70,
    position: 'relative',
    height: 70,
    zIndex: 999,
  },
  btnBlueGradiant: {
    color: 'white',
  },
  orangeGradient: {},
});
