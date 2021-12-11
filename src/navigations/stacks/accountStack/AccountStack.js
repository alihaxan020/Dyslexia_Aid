import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfile from '../../../screens/account/UserProfile';
import EditProfile from '../../../screens/account/EditProfile';

const Stack = createNativeStackNavigator();
const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default AccountStack;
