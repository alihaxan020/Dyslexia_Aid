import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SIZES} from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const ViewCard = props => {
  const {bgColor, delay} = props;
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
      style={[
        styles.container,
        {backgroundColor: bgColor},
        reanimatedStyle,
      ]}></Animated.View>
  );
};

export default ViewCard;
const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2.35,
    height: SIZES.height / 3.4,
    marginHorizontal: 20,
  },
});
