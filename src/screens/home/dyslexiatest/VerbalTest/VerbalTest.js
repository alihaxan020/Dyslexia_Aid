import React, {useState} from 'react';
import {View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {images, COLORS} from '../../../../constants';
const questions = [
  {
    questionText: 'Sad',
    answerOptions: [
      {answerText: 'Dad', isCorrect: false},
      {answerText: 'Bad', isCorrect: false},
      {answerText: 'Sad', isCorrect: true},
      {answerText: 'Pad', isCorrect: false},
    ],
  },
  {
    questionText: 'Fat',
    answerOptions: [
      {answerText: 'Bat', isCorrect: false},
      {answerText: 'Fat', isCorrect: true},
      {answerText: 'Sat', isCorrect: false},
      {answerText: 'Dat', isCorrect: false},
    ],
  },
  {
    questionText: 'Dog',
    answerOptions: [
      {answerText: 'Dog', isCorrect: true},
      {answerText: 'Fog', isCorrect: false},
      {answerText: 'Log', isCorrect: false},
      {answerText: 'Zog', isCorrect: false},
    ],
  },
  {
    questionText: 'Sun',
    answerOptions: [
      {answerText: 'Gun', isCorrect: false},
      {answerText: 'Fun', isCorrect: false},
      {answerText: 'Cun', isCorrect: false},
      {answerText: 'Sun', isCorrect: true},
    ],
  },
];
const VerbalTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [report, setReport] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [nextBtn, setNextBtn] = useState(true);
  return (
    <ImageBackground
      source={images.backgroundApp}
      style={{flex: 1}}
      resizeMode="cover">
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.secondary]}
        style={styles.headerContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.headerView}>
          <Text style={styles.headingText}>Verbal Test</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default VerbalTest;
