import React from 'react';
import {Text, View} from 'react-native';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import styles from './styles';
const UserProfile = () => {
  return (
    <BackgroundImageApp>
      <View style={styles.bodyContainer}></View>
    </BackgroundImageApp>
  );
};

export default UserProfile;
