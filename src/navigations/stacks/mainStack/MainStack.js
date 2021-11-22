import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from '../../tabNavigation/TabStack';
import VerbalTest from '../../../screens/home/dyslexiatest/VerbalTest/VerbalTest';
import DyslexicForm from '../../../screens/home/selfessment/DyslexicForm';
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
        name="VerbalTest"
        component={VerbalTest}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DyslexicForm"
        component={DyslexicForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
