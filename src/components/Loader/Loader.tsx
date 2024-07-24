import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../utils/colors';


const Loader = ({loadingText}: any) => {
  const translateY = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      speed: 2,
      bounciness: 10, // Adjust the bounciness as needed
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <LottieView
        style={{...styles.lottie}}
        source={require('../../assets/lottie/dropping-dot-ball-edited.json')}
        autoPlay
        loop
      />
      <Animated.Image
        style={{...styles.image, transform: [{translateY}]}}
        source={require('../../assets/favicon.png')}
      />
      {loadingText && (
        <View style={{position: 'absolute', paddingTop: 150}}>
          {/* <MyText>{loadingText}</MyText> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: colors.myRedTrx,
    zIndex: 999,
    height: '100%',
    width: '100%',
  },

  lottie: {
    width: 260,
    height: 260,
    resizeMode: 'cover',
    marginTop: -70,
    zIndex: 999,
  },
  // Adjust the resizeMode as needed
  image: {
    position: 'absolute',
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    resizeMode: 'cover', // Adjust the resizeMode as needed
    // top: '50%', // Center vertically
    // left: '50%', // Center horizontally
    // marginLeft: -20, // Adjust half of the image width
    // marginTop: -10, // Adjust half of the image height
  },
});

export default Loader;
