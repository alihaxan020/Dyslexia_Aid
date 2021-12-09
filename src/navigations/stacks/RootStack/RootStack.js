import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/rootscreens/SplashScreen';
import SigninScreen from '../../../screens/rootscreens/SigninScreen';
import SignupScreen from '../../../screens/rootscreens/SignupScreen';
import MainStack from '../mainStack/MainStack';
import {useLogin} from '../../../context/LoginProvider';
import AppLoader from '../../../components/common/AppLoader';
import ForgetPassword from '../../../screens/rootscreens/ForgetPassword';
import OtpVerification from '../../../screens/rootscreens/OtpVerification';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const RootStack = () => {
  const {isLoggedIn, loginPending} = useLogin();
  return (
    <>
      {isLoggedIn ? (
        <>
          <MainStack options={{headerShown: false}} />
          {loginPending ? <AppLoader /> : null}
        </>
      ) : (
        <>
          <AuthStack />
          {loginPending ? <AppLoader /> : null}
        </>
      )}
    </>
  );
};
export default RootStack;
