import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from '../../../screens/camera/CamerScreen';
import Summarizer from '../../../screens/camera/Summarizer';
const Stack = createNativeStackNavigator();
const CameraStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Summarizer"
        component={Summarizer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CameraStack;
