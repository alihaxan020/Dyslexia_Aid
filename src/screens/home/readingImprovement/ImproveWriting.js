import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SIZES, images, icons, COLORS} from '../../../constants';
import Voice from '@react-native-community/voice';
import HeaderTest from '../../../components/common/HeaderTest';
import TextToSpeech from '../../../components/common/TextToSpeech';
import SpeechSettingModal from '../../../components/common/SpeechSettingModal';
import GradientView from '../../../components/common/GradientView';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
const ImproveWriting = ({navigation}) => {
  const BackScreen = navigation.goBack;
  const [userWord, setUserWord] = useState('');
  const [result, setResult] = useState('');
  const [remark, setRemark] = useState('');
  const [check, setCheck] = useState(false);
  const [speechModal, setSpeechModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const speakRef = useRef();
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStartHandler = e => {
    setLoading(true);
  };
  const onSpeechEndHandler = e => {
    setLoading(false);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
  };
  const startRecording = async () => {
    setResult('');
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const handleSpeechRate = async rate => {
    speakRef.current.setSpeechRate(rate);
    setSpeechRate(rate);
  };
  const handleSpeechPitch = async rate => {
    speakRef.current.setSpeechPitch(rate);
    setSpeechPitch(rate);
  };
  const handleReset = () => {
    setResult('');
    setUserWord('');
  };
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Listen & Practice" BackScreen={BackScreen} />
      <TextToSpeech ref={speakRef} />
      <SpeechSettingModal
        visible={speechModal}
        handleSpeechPitch={handleSpeechPitch}
        handleSpeechRate={handleSpeechRate}
        speechRate={speechRate}
        speechPitch={speechPitch}
        setSpeechModal={setSpeechModal}
      />
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.titleText}>Enter any word you want to listen</Text>
      </View>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.12,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 0,
        }}>
        <View
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.height * 0.07,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 15,
            paddingHorizontal: 10,
            elevation: 24,
          }}>
          <TextInput
            value={userWord}
            style={styles.subTitle}
            placeholder="Enter the word here"
            onChangeText={e => setUserWord(e)}
            autoCorrect={false}
          />
        </View>
      </View>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.titleText}>Tap on the icon below to listen</Text>
        <Text style={[styles.titleText, {alignItems: 'center'}]}>
          the word written above
        </Text>
      </View>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '40%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() =>
              speakRef.current.getAlert(
                userWord == '' ? 'Please enter your word first' : userWord,
              )
            }>
            <Image style={styles.listenImage} source={images.listenicon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setSpeechModal(true)}>
          <Image style={styles.speechSettings} source={images.voiceSetting} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.titleText, {textAlign: 'center'}]}>
        Speak the word you have listened
      </Text>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.44,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={styles.textInputStyle}>
          <View pointerEvents="none" style={{flex: 1}}>
            <TextInput
              caretHidden={true}
              value={result}
              placeholder="Your speak word show here"
              style={[styles.paragrapgh, {color: 'black'}]}
            />
          </View>
          <View style={{width: '15%', alignItems: 'center'}}>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image
                  source={icons.mic}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {check ? (
          <Text style={[styles.titleText, {textAlign: 'center'}]}>
            {remark}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => handleReset()}
          style={styles.buttonContainer}>
          <GradientView
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.nextButton}>
            <Text style={styles.titleText}>Try another word!</Text>
          </GradientView>
        </TouchableOpacity>
      </View>
    </BackgroundImageApp>
  );
};

export default ImproveWriting;

const styles = StyleSheet.create({
  titleText: {
    fontSize: SIZES.padding,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  listenImage: {
    width: SIZES.width * 0.28,
    height: SIZES.width * 0.28,
    borderRadius: (SIZES.width * 0.28) / 2,
    resizeMode: 'cover',
  },
  speechSettings: {
    width: SIZES.width * 0.13,
    height: SIZES.width * 0.13,
    borderRadius: (SIZES.width * 0.13) / 2,
    resizeMode: 'cover',
  },
  paragrapgh: {
    flex: 1,
    fontSize: SIZES.h3,
    color: 'white',
    fontWeight: 'bold',
  },
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    height: SIZES.height * 0.1,
  },
  nextButton: {
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.6,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
