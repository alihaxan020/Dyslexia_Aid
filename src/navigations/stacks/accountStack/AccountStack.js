import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfile from '../../../screens/account/UserProfile';

const Stack = createNativeStackNavigator();
const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default AccountStack;
