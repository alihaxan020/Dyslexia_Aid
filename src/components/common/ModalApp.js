import React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';

import {COLORS} from '../../constants';
const ModalApp = props => {
  const {visible, quit, continueTest} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
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
              marginVertical: 25,
            }}>
            Do you want quit the Dyslexic Test?
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => quit()}
              style={{
                backgroundColor: COLORS.error,
                padding: 20,
                width: '40%',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontSize: 20,
                }}>
                Go Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => continueTest()}
              style={{
                backgroundColor: COLORS.success,
                padding: 20,
                width: '40%',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontSize: 20,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalApp;
