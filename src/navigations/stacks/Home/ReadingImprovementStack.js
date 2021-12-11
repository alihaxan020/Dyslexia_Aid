import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadingImprovement from '../../../screens/home/readingImprovement/ReadingImprovement';
const Stack = createNativeStackNavigator();
const ReadingImprovementStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ReadingImprovement" component={ReadingImprovement} />
    </Stack.Navigator>
  );
};

export default ReadingImprovementStack;
