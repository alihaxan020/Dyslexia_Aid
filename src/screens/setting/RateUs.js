import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Rating} from 'react-native-ratings';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import ModalApp from '../../components/common/ModalApp';
import GradientView from '../../components/common/GradientView';
import AppLoader from '../../components/common/AppLoader';
import {rateUs} from '../../api/user';
import styles from './styles';
import {COLORS} from '../../constants';
const RateUs = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const [dyslexiatest, setDyslexiatest] = useState(1);
  const [selfassessment, setSelfassessment] = useState(1);
  const [loader, setLoader] = useState(false);

  const [app, setApp] = useState(1);
  const handleContinue = () => setBackModal(true);
  const BackScreen = navigation.goBack;

  const handleRating = async () => {
    let data = {
      dyslexiatest: dyslexiatest,
      selfassessment: selfassessment,
      app: app,
    };

    try {
      const res = await rateUs(data);
      Alert.alert('Dyslexia Aid', 'Thank you for rating our app.', [
        {
          text: 'Go Back',
          onPress: () => navigation.navigate('SettingScreen'),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setLoader(false);
    };
  });

  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Rate Us" BackScreen={handleContinue} />
      {loader ? <AppLoader /> : null}
      <ModalApp
        visible={backModal}
        feedback="Do you want go back?"
        quit={BackScreen}
        continueTest={() => setBackModal(false)}
        quitText="Go Back"
        continueTestText="Continue"
      />
      <View style={styles.bodyContainer}>
        <ScrollView>
          <View style={styles.ratingContainer}>
            <View style={styles.rateStyle}>
              <Text
                style={[
                  styles.subHeading,
                  {color: 'black', borderBottomWidth: 1},
                ]}>
                Rate Dyslexia Test
              </Text>
              <Rating
                startingValue={dyslexiatest}
                showRating
                onFinishRating={e => setDyslexiatest(e)}
                style={{paddingVertical: 10}}
                imageSize={50}
              />
            </View>
            <View style={styles.rateStyle}>
              <Text
                style={[
                  styles.subHeading,
                  {color: 'black', borderBottomWidth: 1},
                ]}>
                Rate selfassessment Test
              </Text>
              <Rating
                startingValue={selfassessment}
                showRating
                onFinishRating={rate => setSelfassessment(rate)}
                style={{paddingVertical: 10}}
                imageSize={50}
              />
            </View>
            <View style={styles.rateStyle}>
              <Text
                style={[
                  styles.subHeading,
                  {color: 'black', borderBottomWidth: 1},
                ]}>
                Overall App Rating
              </Text>
              <Rating
                startingValue={app}
                showRating
                onFinishRating={e => setApp(e)}
                style={{paddingVertical: 10}}
                imageSize={50}
              />
            </View>

            {dyslexiatest == 1 && selfassessment == 1 && app == 1 ? null : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleRating()}>
                  <GradientView
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.nextButton}>
                    <Text style={styles.headingText}>Submit</Text>
                  </GradientView>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </BackgroundImageApp>
  );
};

export default RateUs;
