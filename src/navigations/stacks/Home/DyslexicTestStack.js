import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DyslexicTest from '../../../screens/home/dyslexiatest/DyslexicTest';
import VerbalTest from '../../../screens/home/dyslexiatest/VerbalTest/VerbalTest';
import WrittenTest from '../../../screens/home/dyslexiatest/writtenTest/WrittenTest';
import LevelTwo from '../../../screens/home/dyslexiatest/VerbalTest/LevelTwo';
import LevelThree from '../../../screens/home/dyslexiatest/VerbalTest/LevelThree';
import WrittenLevelThree from '../../../screens/home/dyslexiatest/writtenTest/WrittenLevelThree';
import WrittenLevelTwo from '../../../screens/home/dyslexiatest/writtenTest/WrittenLevelTwo';
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
      <Stack.Screen
        name="VerbalLevelTwo"
        component={LevelTwo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerbalLevelThree"
        component={LevelThree}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrittenTest"
        component={WrittenTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrittenLevelThree"
        component={WrittenLevelThree}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrittenLevelTwo"
        component={WrittenLevelTwo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DyslexicTestStack;
