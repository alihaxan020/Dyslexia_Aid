import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadingImprovement from '../../../screens/home/readingImprovement/ReadingImprovement';
import ImproveListening from '../../../screens/home/readingImprovement/ImproveListening';
import ImproveWriting from '../../../screens/home/readingImprovement/ImproveWriting';
const Stack = createNativeStackNavigator();
const ReadingImprovementStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ReadingImprovement" component={ReadingImprovement} />
      <Stack.Screen name="ImproveListening" component={ImproveListening} />
      <Stack.Screen name="ImproveWriting" component={ImproveWriting} />
    </Stack.Navigator>
  );
};

export default ReadingImprovementStack;
