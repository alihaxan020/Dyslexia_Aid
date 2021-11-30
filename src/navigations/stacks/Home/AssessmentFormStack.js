import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DyslexicForm from '../../../screens/home/selfessment/DyslexicForm';
const Stack = createNativeStackNavigator();

const AssessmentFormStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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

export default AssessmentFormStack;
