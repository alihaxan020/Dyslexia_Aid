import React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {COLORS} from '../../constants';
const SpeechSettingModal = props => {
  const {
    visible,
    handleSpeechPitch,
    handleSpeechRate,
    speechPitch,
    speechRate,
    setSpeechModal,
  } = props;
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
              marginVertical: 20,
              textAlign: 'center',
            }}>
            Speech Setting
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Voice Speed: </Text>
            <Slider
              style={{width: '80%', height: 40}}
              minimumValue={0.01}
              maximumValue={0.99}
              value={speechRate}
              onSlidingComplete={rate => handleSpeechRate(rate)}
              minimumTrackTintColor="red"
              maximumTrackTintColor="green"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Speech Rate: </Text>
            <Slider
              style={{width: '80%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              value={speechPitch}
              onSlidingComplete={rate => handleSpeechPitch(rate)}
              minimumTrackTintColor="red"
              maximumTrackTintColor="green"
            />
          </View>
          <TouchableOpacity
            onPress={() => setSpeechModal(false)}
            style={{
              backgroundColor: COLORS.error,
              padding: 10,
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

export default SpeechSettingModal;
