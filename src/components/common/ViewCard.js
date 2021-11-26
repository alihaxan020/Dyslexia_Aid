import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SIZES} from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SlideInUp,
  withTiming,
  SlideInDown,
} from 'react-native-reanimated';
const ViewCard = props => {
  const {bgColor, delay, title, iconImage} = props;
  const progress = useSharedValue(0);
  const scale = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: progress.value * SIZES.padding,
      transform: [{scaleY: scale.value}],
    };
  }, []);
  useEffect(() => {
    scale.value = withTiming(1, {
      duration: delay,
    });
    progress.value = withTiming(1, {
      duration: delay + 300,
    });
  }, []);
  return (
    <Animated.View
      style={[styles.container, {backgroundColor: bgColor}, reanimatedStyle]}>
      <View style={styles.containerElement}>
        <Image style={styles.boxImage} source={iconImage} />
        <Text style={props.style}>{title}</Text>
      </View>
    </Animated.View>
  );
};

export default ViewCard;
const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2.35,
    height: SIZES.height / 3.4,
    marginHorizontal: 20,
  },
  containerElement: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
  },
  boxImage: {
    width: SIZES.width * 0.35,
    height: SIZES.height * 0.15,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
});
