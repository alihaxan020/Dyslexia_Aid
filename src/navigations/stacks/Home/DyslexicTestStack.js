import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DyslexicTest from '../../../screens/home/dyslexiatest/DyslexicTest';
import VerbalTest from '../../../screens/home/dyslexiatest/VerbalTest/VerbalTest';
const Stack = createNativeStackNavigator();
const DyslexicTestStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="DyslexicTest"
        component={DyslexicTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerbalTest"
        component={VerbalTest}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="AssessmentForm"
        component={DyslexicForm}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default DyslexicTestStack;
