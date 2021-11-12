import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import AccountStack from '../stacks/accountStack/AccountStack';
import HomeStack from '../stacks/homeStack/HomeStack';
import CameraStack from '../stacks/cameraStack/CamerStack';
import SettingScreen from '../../screens/setting/SettingScreen';
import HistoryStack from '../stacks/historyStack/HistoryStack';
import {icons} from '../../constants';

const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      //tabBarOptions={tabOptions}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#9098e3',
        },
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'Home':
              return (
                <View>
                  <Image
                    source={focused ? icons.homeActive : icons.home}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
              );
            case 'Account':
              return (
                <Image
                  source={focused ? icons.userActive : icons.user}
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                />
              );
            case 'Camera':
              return (
                <View style={styles.cameraTab}>
                  <View
                    style={{
                      // backgroundColor: '#8b8edf',
                      width: 60,
                      height: 60,
                      borderRadius: 60,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={focused ? icons.cameraActive : icons.camera}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  </View>
                </View>
              );
            case 'History':
              return (
                <Image
                  source={focused ? icons.historyActive : icons.history}
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                />
              );
            case 'Setting':
              return (
                <Image
                  source={focused ? icons.settingActive : icons.setting}
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                />
              );
            default:
              break;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  cameraTab: {
    backgroundColor: '#9098e3',
    width: 70,
    height: 70,
    borderRadius: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10, // space from bottombar
    borderEndWidth: 2,
    borderStartWidth: 1,
  },
});
