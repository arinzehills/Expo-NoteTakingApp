import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import MyTextButton from '../MyButton/MyTextButton';
import {colors} from '../../utils/colors';
import MyText from '../MyText/MyText';

interface Props {
  preText: string;
  mainText: string;
  onPress?: (event: GestureResponderEvent) => void | undefined; // Make margin prop optional
}
const NoAccount: FunctionComponent<Props> = props => {
  return (
    <View style={styles.ctn}>
      <MyText size="xm" color={'gray'}>
        {props.preText}
      </MyText>
      <MyTextButton
        textStyles={{color: colors.myRed, fontSize: 18}}
        onPress={props.onPress}>
        {props.mainText}
      </MyTextButton>
    </View>
  );
};

export default NoAccount;

const styles = StyleSheet.create({
  ctn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
