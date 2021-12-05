import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LevelThree from '../../../screens/home/dyslexiatest/VerbalTest/LevelThree';
const Stack = createNativeStackNavigator();

const ReadingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="VerbalLevelThree"
        component={LevelThree}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ReadingStack;
