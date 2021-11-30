import React, {useEffect, useState} from 'react';
const {forwardRef, useImperativeHandle} = React;
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import Tts from 'react-native-tts';
const TextToSpeech = forwardRef((props, ref) => {
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  useEffect(() => {
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start');
    Tts.addEventListener('tts-finish');
    Tts.addEventListener('tts-cancel');
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
  }, []);
  useImperativeHandle(ref, () => ({
    async getAlert(value) {
      Tts.stop();
      Tts.speak(value);
      console.log(value);
    },
    stopSpeaker() {
      Tts.stop();
    },
    async setSpeechRate(rate) {
      await Tts.setDefaultRate(rate);
      setSpeechRate(rate);
    },
    async setSpeechPitch(rate) {
      await Tts.setDefaultPitch(rate);
      setSpeechPitch(rate);
    },
  }));
  return null;
});

export default TextToSpeech;
