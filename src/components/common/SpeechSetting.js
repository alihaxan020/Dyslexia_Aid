import React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
const SpeechSetting = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(40,43,164,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              width: '90%',
              marginVertical: 20,
              textAlign: 'center',
            }}>
            Speech Setting
          </Text>
          <TouchableOpacity
            onPress={() => console.log('Ali Hassan')}
            style={{
              backgroundColor: COLORS.primary,
              padding: 7,
              width: '40%',
              borderRadius: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontSize: 20,
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SpeechSetting;
