import { Dimensions } from 'react-native';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const horizontalScale = (size, round=true ) => {
    const { width, height } = Dimensions.get('screen');
  const value = width / guidelineBaseWidth * size
  return round ? Math.round(value) : value
};
const verticalScale = (size, round = true) => {
    const { width, height } = Dimensions.get('screen');
  const value =  height / guidelineBaseHeight * size
  return round ? Math.round(value) : value
};
const moderateScale = (size, factor = 0.5) => Math.round(size + ( horizontalScale(size) - size ) * factor);

export {horizontalScale, verticalScale, moderateScale};
