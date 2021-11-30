import React from 'react';
import {ImageBackground} from 'react-native';
import {images} from '../../constants';
const BackgroundImageApp = ({children}) => {
  return (
    <ImageBackground
      source={images.backgroundApp}
      style={{flex: 1}}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};
export default BackgroundImageApp;
