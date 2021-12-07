import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import ModalApp from '../../components/common/ModalApp';
import GradientView from '../../components/common/GradientView';
import styles from './styles';
import {COLORS} from '../../constants';
const RateUs = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const [dyslexiatest, setDyslexiatest] = useState(0);
  const [selfassessment, setSelfassessment] = useState(0);
  const [app, setApp] = useState(0);
  const handleContinue = () => setBackModal(true);
  const BackScreen = navigation.goBack;

  const handleRating = () => {
    console.log('Rating is: ', dyslexiatest, app, selfassessment);
  };

  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Rate Us" BackScreen={handleContinue} />
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
                showRating
                onFinishRating={e => setApp(e)}
                style={{paddingVertical: 10}}
                imageSize={50}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleRating()}>
                <GradientView
                  colors={[COLORS.primary, COLORS.secondary]}
                  style={styles.nextButton}>
                  <Text style={styles.headingText}>Submit</Text>
                </GradientView>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundImageApp>
  );
};

export default RateUs;
