import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from '../../../screens/camera/CamerScreen';
const Stack = createNativeStackNavigator();
const CameraStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default CameraStack;
