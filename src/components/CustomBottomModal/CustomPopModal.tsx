import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import {colors} from '../../utils/colors';

type CustomModalProps = {
  setIsOpen: ({}: boolean) => void;
  isOpen: boolean;
  loading?: boolean;
  children: React.ReactNode | undefined;
  viewHeight?: number;
};
const CustomPopModal: React.FC<CustomModalProps> = ({
  viewHeight = 350,
  children,
  setIsOpen,
  isOpen,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {height: viewHeight}]}>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.buttonClose}>
                <Text style={{fontSize: 15, color: colors.grayDark}}>X</Text>
              </TouchableOpacity>
              <Animated.Image
                style={{...styles.image}}
                source={require('../../assets/logo.png')}
              />
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomPopModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 100,
    borderWidth: 0.5,
    width: 30,
    aspectRatio: 1,
    borderColor: 'black',
    marginTop: -10,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -20,
  },
});
