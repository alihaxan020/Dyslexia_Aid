import React, {useRef, useEffect, useState} from 'react';
import Animated, {
  SlideInDown,
  SlideInRight,
  SlideOutDown,
  SlideOutRight,
} from 'react-native-reanimated';
import GradientView from '../../../components/common/GradientView';
var randomWords = require('random-words');
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {SIZES, COLORS, images} from '../../../constants';
import HeaderTest from '../../../components/common/HeaderTest';
import TextToSpeech from '../../../components/common/TextToSpeech';
import SpeechSettingModal from '../../../components/common/SpeechSettingModal';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
const ImproveListening = ({navigation}) => {
  const BackScreen = navigation.goBack;
  const [array, setArray] = useState([]);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechModal, setSpeechModal] = useState(false);
  const [speechPitch, setSpeechPitch] = useState(1);
  const speakRef = useRef();
  useEffect(() => {
    const a = randomWords(5);
    setArray(a);
  }, []);

  const handleArray = () => {
    const a = randomWords(5);
    setArray(a);
  };
  const handleSpeechRate = async rate => {
    speakRef.current.setSpeechRate(rate);
    setSpeechRate(rate);
  };
  const handleSpeechPitch = async rate => {
    speakRef.current.setSpeechPitch(rate);
    setSpeechPitch(rate);
  };
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Improve Listening" BackScreen={BackScreen} />
      <SpeechSettingModal
        visible={speechModal}
        handleSpeechPitch={handleSpeechPitch}
        handleSpeechRate={handleSpeechRate}
        speechRate={speechRate}
        speechPitch={speechPitch}
        setSpeechModal={setSpeechModal}
      />
      <TextToSpeech ref={speakRef} />
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.titleText}>Tap on any word to listen</Text>
        <Text style={styles.titleText}>the word written on it</Text>
        <View
          style={{
            width: '60%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.titleText}>Speech Setting</Text>
          <TouchableOpacity onPress={() => setSpeechModal(true)}>
            <Image style={styles.speechSettings} source={images.voiceSetting} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        {array.map(item => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            key={item}>
            <TouchableOpacity
              onPress={() => speakRef.current.getAlert(item)}
              style={{
                height: '70%',
                width: '70%',
                borderRadius: 30,
                borderWidth: 1,
              }}>
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  backgroundColor: COLORS.primarybg,
                  borderRadius: 30,
                  borderColor: 'black',
                }}
                entering={SlideInDown.duration(300)
                  .springify()
                  .damping(60)
                  .stiffness(100)}
                exiting={SlideOutRight.springify().damping(9).stiffness(20)}>
                <Text style={[styles.titleText, {color: 'black'}]}>
                  {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => handleArray()}
          style={{width: '60%', height: '80%', justifyContent: 'center'}}>
          <GradientView
            colors={[COLORS.primary, COLORS.secondary]}
            style={{
              width: '100%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text style={styles.titleText}>More Words</Text>
          </GradientView>
        </TouchableOpacity>
      </View>
    </BackgroundImageApp>
  );
};

export default ImproveListening;

const styles = StyleSheet.create({
  bodyContainer: {
    height: SIZES.height * 0.78,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.padding2 * 1.5,
    borderTopRightRadius: SIZES.padding2 * 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    height: '25%',
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 24,
    shadowColor: 'black',
    shadowRadius: 16.0,
    borderRadius: 10,
  },
  viewChildOne: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildTwo: {
    height: '100%',
    width: '55%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageStyle: {width: '80%', height: '70%', resizeMode: 'cover'},
  titleText: {
    fontSize: SIZES.padding,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    color: 'blue',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '20%',
    backgroundColor: 'green',
    borderRadius: 30,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    flexDirection: 'column',
  },
  speechSettings: {
    width: SIZES.width * 0.15,
    height: SIZES.width * 0.15,
    overflow: 'hidden',
  },
});
