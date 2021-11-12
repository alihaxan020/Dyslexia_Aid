import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HistoryScreen from '../../../screens/history/HistoryScreen';
const Stack = createNativeStackNavigator();
const HistroyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistroyStack" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default HistroyStack;
