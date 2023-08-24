import {Platform} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const fontSizes = {
  sixteenSize: 16,
  fourteenZise: 14,
};

export const fontWeights = {
  normal: 'normal',
  hard: '600',
  medium: '500',
  semiMedium: '400',
};

export const colors = {
  blackColor: '#000000',
  white: '#fff',
  green: '#00AE28',
  red: '#FC0000',
  darkGreen: '#003300',
  bgColor:'#50215D',
  fontColor: '#522289',
  btnBGcolor: '#705376',
  dotSelectColor: '#BBAABF',
  fogetpasswordTextColor: '#D9D9D9',
  ansBtnColor: '#BBAABF'
};

export const materialTextFieldStyle = {
  tintColor: colors.purpleColor1,
  activeLineWidth: 2,
  textColor: colors.blackColor,
  titleFontSize: fontSizes.sixteenSize,
  labelFontSize: fontSizes.sixteenSize,
};
