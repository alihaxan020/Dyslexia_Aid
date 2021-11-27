import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#282ba4',
  secondary: '#572da6',
  primarybg: '#e3e5f2',
  secondarybg: '#0b0328',
  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#F5F7F9',
  lightGray2: '#FAFBFD',
  gray: '#BEC1D2',
  blue: '#42B0FF',
  darkgray: '#898C95',
  yellow: '#FFD573',
  lightBlue: '#95A9B8',
  darkgreen: '#008159',
  peach: '#FF615F',
  purple: '#8e44ad',
  red: '#FF0000',
  // rgba:
  primaryOpacity: 'rgba(40, 43, 164, 0.7)',
  //viewColor
  lightCoral: '#bd8dbf',
  lightGoldenrod: '#FEC689',
  lightGreen: '#82ca9c',
  lightOrange: '#f59678',
  success: '#00C851',
  error: '#ff4444',
  accent: '#3498db',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 16,
  body5: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'Poppins-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
