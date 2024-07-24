import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const NoItemComponent = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="no-sim" size={100} color={colors.myRed} />
      <Text style={styles.text}>No items available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor:colors.myRedTrx
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default NoItemComponent;
