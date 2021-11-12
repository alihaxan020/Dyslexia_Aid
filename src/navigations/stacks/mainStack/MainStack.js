import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from '../../tabNavigation/TabStack';
import DyslexicForm from '../../../screens/home/selfessment/DyslexicForm';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DyslexicForm" component={DyslexicForm} />
    </Stack.Navigator>
  );
};

export default MainStack;
