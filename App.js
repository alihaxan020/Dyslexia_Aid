import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootStack from './src/navigations/stacks/RootStack/RootStack';
import LoginProvider from './src/context/LoginProvider';
const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const App = () => {
  return (
    <LoginProvider>
      <NavigationContainer theme={theme}>
        <RootStack />
      </NavigationContainer>
    </LoginProvider>
  );
};

export default App;
