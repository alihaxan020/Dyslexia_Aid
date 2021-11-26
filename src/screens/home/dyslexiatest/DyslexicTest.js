import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const DyslexicTest = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Dyslexic Test</Text>
      <TouchableOpacity onPress={() => navigation.navigate('VerbalTest')}>
        <Text>Go to DyslexicTest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DyslexicTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
