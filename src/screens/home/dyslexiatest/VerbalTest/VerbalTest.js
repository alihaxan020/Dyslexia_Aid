import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import styles from './styles';
import {images} from '../../../../constants';
import HeaderTest from '../../../../components/common/HeaderTest';
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
const VerbalTest = ({navigation}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [report, setReport] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [nextBtn, setNextBtn] = useState(true);
  const BackScreen = navigation.goBack;
  return (
    <ImageBackground
      source={images.backgroundApp}
      style={{flex: 1}}
      resizeMode="cover">
      <HeaderTest headerText="Verbal Test" BackScreen={BackScreen} />
    </ImageBackground>
  );
};

export default VerbalTest;
