import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Pressable,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { colors } from '../../utils/colors';
import { BlurView } from 'expo-blur';
import { verticalScale } from '../../utils/Scaling';
import MyText from '../MyText/MyText';


type CustomModalProps = {
  setIsOpen: ({ }: boolean) => void;
  isOpen: boolean;
  loading?: boolean;
  children: React.ReactNode | undefined;
  viewHeight?: number;
};
const CustomBottomModal: React.FC<CustomModalProps> = ({
  viewHeight = verticalScale(350),
  children,
  setIsOpen,
  isOpen,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, // Adjust the duration as needed
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [fadeAnim, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };
  // <View
  // style={{
  //   alignSelf: 'center',
  //   width: 100,
  //   position: 'absolute',
  //   height: 4,
  //   top: Dimensions.get('screen').height * 0.35,
  //   zIndex: 10291,
  //   borderRadius: 20,
  //   backgroundColor: 'black',
  // }}></View>
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.centeredView}>
            <Animated.View style={[styles.blurContainer, { opacity: fadeAnim }]}>
              <BlurView intensity={30} style={styles.blurContainer}>
                <Text style={{}}>{'text'}</Text>
              </BlurView>
            </Animated.View>
            <View style={[styles.modalView, { height: viewHeight }]}>
              <View style={styles.modalTitle}>
               <MyText size='sm' bold={true} textStyle={{textAlign:'center'}}>Title</MyText>
                <Pressable
                  onPress={() => setIsOpen(false)}
                  style={styles.buttonClose}>
                  <Text style={{ fontSize: 15, color: colors.grayDark }}>X</Text>
                </Pressable>
              </View>
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

    // backgroundColor: '#f0f6ffb1',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS == 'android' ? 'rgba(255, 255, 255, 0.5)' : '', // Adjust the background color and opacity as needed
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalTitle:{marginBottom:4,justifyContent:'space-between',alignItems:'center',flexDirection:'row'},
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
    bottom: -20,
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
});
