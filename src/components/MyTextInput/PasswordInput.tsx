import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { verticalScale } from '../../utils/Scaling';

const PasswordInput = ({ placeholder, value, onChangeText, ...props }:any) => {
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
        
      />
      <TouchableOpacity onPress={toggleSecureText} style={styles.icon}>
        <MaterialIcons name={secureText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: verticalScale(45),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  icon: {
    padding: 8,
    position: 'absolute',
    right:5
  },
});

export default PasswordInput;
