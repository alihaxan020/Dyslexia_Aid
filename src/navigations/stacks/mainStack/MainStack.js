import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from '../../tabNavigation/TabStack';
import DyslexicTestStack from '../Home/DyslexicTestStack';
import AssessmentFormStack from '../Home/AssessmentFormStack';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="Tabs"
        component={TabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DyslexicTestStack"
        component={DyslexicTestStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AssessmentFormStack"
        component={AssessmentFormStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
