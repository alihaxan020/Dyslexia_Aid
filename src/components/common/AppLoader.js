import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

const AppLoader = props => {
  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.container, props.style]}>
      <LottieView
        source={require('../../../assets/icons/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
