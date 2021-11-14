import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabStack from '../../tabNavigation/TabStack';
import VerbalTest from '../../../screens/home/dyslexiatest/VerbalTest/VerbalTest';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerbalTest"
        component={VerbalTest}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
