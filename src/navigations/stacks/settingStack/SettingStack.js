import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from '../../../screens/setting/SettingScreen';
import ContactUs from '../../../screens/setting/ContactUs';
import TermsScreen from '../../../screens/setting/TermsScreen';
const Stack = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
