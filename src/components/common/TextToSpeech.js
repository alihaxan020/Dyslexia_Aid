import React, {useEffect} from 'react';
const {forwardRef, useImperativeHandle} = React;
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import Tts from 'react-native-tts';
const TextToSpeech = forwardRef((props, ref) => {
  useEffect(() => {
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start');
    Tts.addEventListener('tts-finish');
    Tts.addEventListener('tts-cancel');
  }, []);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    getAlert(value) {
      Tts.stop();
      Tts.speak(value);
      console.log(value);
    },
    stopSpeaker() {
      Tts.stop();
    },
  }));
  return null;
});

export default TextToSpeech;
