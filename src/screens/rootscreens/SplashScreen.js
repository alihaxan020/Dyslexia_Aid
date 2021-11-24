import React, {useState, useRef} from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {images, COLORS, SIZES, FONTS} from '../../constants';
import TextToSpeech from '../../components/common/TextToSpeech';
const SplashScreen = ({navigation}) => {
  [speaker, setSpeaker] = useState(false);
  const speakRef = useRef();
  const handleSpeech = () => {
    if (speaker) {
      setSpeaker(!speaker);
      speakRef.current.stopSpeaker();
    } else {
      setSpeaker(!speaker);
      const thingToSay =
        ' Dyslexia Aid Welcome Help to improve speech sounds Get Started ';
      speakRef.current.getAlert(thingToSay);
    }
  };
  const handleNavigation = () => {
    speakRef.current.stopSpeaker();
    setSpeaker(false);
    navigation.navigate('SigninScreen');
  };
  return (
    <ImageBackground
      source={images.background}
      style={styles.background}
      resizeMode="stretch">
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logoImage} />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Animatable.Text
            animation="slideInLeft"
            duration={1500}
            style={styles.title}>
            WELCOME
          </Animatable.Text>
          <TextToSpeech ref={speakRef} />
          <TouchableOpacity onPress={handleSpeech}>
            {speaker ? (
              <FontAwesome5 name="volume-up" color="green" size={25} />
            ) : (
              <FontAwesome5 name="volume-mute" color={COLORS.black} size={25} />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
            }}>
            DyslexiaAid will help you to improve reading skill and save all your
            important files in one place.
          </Text>
        </View>
        <View
          style={{
            marginVertical: SIZES.padding2,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={handleNavigation}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary, COLORS.secondary]}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: SIZES.width / 1.5,
                borderRadius: SIZES.padding,
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  padding: SIZES.base,
                }}>
                Get Started
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <StatusBar translucent backgroundColor={'#ffffff00'} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  footer: {
    flex: 0.65,
    backgroundColor: COLORS.primarybg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: SIZES.width * 0.5,
    height: SIZES.width * 0.5,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  title: {
    ...FONTS.h1,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});
