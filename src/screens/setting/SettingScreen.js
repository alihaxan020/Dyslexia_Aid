import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useLogin} from '../../context/LoginProvider';
import {signOut} from '../../api/user';
import AppLoader from '../../components/common/AppLoader';
const SettingScreen = () => {
  const {setIsLoggedIn, setLoginPending} = useLogin();

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <TouchableOpacity
        style={{
          width: 100,
          height: 50,
          borderStyle: 'solid',
          borderWidth: 2,
          backgroundColor: 'red',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={async () => {
          setLoginPending(true);
          const isLoggedOut = await signOut();
          if (isLoggedOut) {
            setIsLoggedIn(false);
            setLoginPending(false);
          }
          setLoginPending(false);
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
