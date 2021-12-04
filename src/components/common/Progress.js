import React from 'react';
import {View, Animated} from 'react-native';

const Progress = ({step, steps, height}) => {
  const [widthN, setWidthN] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  React.useEffect(() => {
    //-width + width * setp/steps
    reactive.setValue(-widthN + (widthN * step) / steps);
  }, [step, widthN]);
  return (
    <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidthN(newWidth);
      }}
      style={{
        height,
        backgroundColor: '#e3e5f2',
        borderRadius: height,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          height,
          borderRadius: height,
          backgroundColor: '#282ba4',
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [{translateX: animatedValue}],
        }}
      />
    </View>
  );
};

export default Progress;
