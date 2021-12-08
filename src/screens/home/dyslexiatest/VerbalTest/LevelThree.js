import React, {useState, useRef, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import BackgroundImageApp from '../../../../components/common/BackgroundImageApp';
import HeaderTest from '../../../../components/common/HeaderTest';
import ModalApp from '../../../../components/common/ModalApp';
import TextToSpeech from '../../../../components/common/TextToSpeech';
import SpeechSettingModal from '../../../../components/common/SpeechSettingModal';
import GradientView from '../../../../components/common/GradientView';
import {images, COLORS} from '../../../../constants';
import styles from './styles';
import Report from '../../../../components/dyslexicTest/Report';
const data = ['Information', 'Today', 'Dog', 'Read', 'Listen'];

const LevelThree = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechModal, setSpeechModal] = useState(false);
  const [text, setText] = useState('');
  const [test, setTest] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [compare, setCompare] = useState(false);
  const [check, setCheck] = useState(false);
  const [report, setReport] = useState(false);

  const BackScreen = navigation.goBack;
  const speakRef = useRef();
  const handleContinue = () => setBackModal(true);
  const handleSpeechRate = async rate => {
    speakRef.current.setSpeechRate(rate);
    setSpeechRate(rate);
  };
  const handleSpeechPitch = async rate => {
    speakRef.current.setSpeechPitch(rate);
    setSpeechPitch(rate);
  };
  const handleSubmit = () => {
    let question = test[currentQuestionIndex].toLowerCase();
    let answer = text.toLowerCase();
    console.log(question, answer);
    question == answer
      ? (setScore(score + 1), setCompare(true))
      : (setScore(score), setCompare(false));
    setCheck(true);
  };
  useEffect(() => {
    setTest(data);
  }, []);
  const handleNext = () => {
    setCheck(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCompare(false);
    setText('');
  };
  const restartQuiz = () => {
    setReport(false);
    setCheck(false);
    setCurrentQuestionIndex(0);
    setCompare(false);
    setText('');
    setScore(0);
  };
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Verbal Level 3" BackScreen={handleContinue} />
      <TextToSpeech ref={speakRef} />
      <ModalApp
        visible={backModal}
        feedback=" Do you want quit the Dyslexic Test?"
        quit={BackScreen}
        continueTest={() => setBackModal(false)}
        quitText="Go Back"
        continueTestText="Continue"
      />

      <SpeechSettingModal
        visible={speechModal}
        handleSpeechPitch={handleSpeechPitch}
        handleSpeechRate={handleSpeechRate}
        speechRate={speechRate}
        speechPitch={speechPitch}
        setSpeechModal={setSpeechModal}
      />
      {report ? (
        <Report
          test="Verbal"
          level="Level 3"
          obtainedScore={score}
          totalScore={data.length}
          resetTest={restartQuiz}
        />
      ) : (
        <View style={styles.bodyContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.levelText}>Level 3</Text>
            <GradientView
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.questionCount}>
              <Text style={styles.subHeading}>
                {currentQuestionIndex + 1}/{test.length}
              </Text>
            </GradientView>
            <Text style={styles.headingText}>
              Press the below button to listen word
            </Text>
          </View>
          <View style={styles.optionsSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    speakRef.current.getAlert(test[currentQuestionIndex])
                  }>
                  <Image
                    style={styles.listenImage}
                    source={images.listenicon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setSpeechModal(true)}>
                <Image
                  style={styles.speechSettings}
                  source={images.voiceSetting}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[styles.optionContainer, {justifyContent: 'flex-start'}]}>
              {check ? (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.subHeading}>Result</Text>
                  <Text style={styles.subHeading}>Pronounced Word</Text>
                  <View
                    style={[styles.resultText, {borderColor: COLORS.success}]}>
                    <Text style={[styles.headingText, {color: 'black'}]}>
                      {test[currentQuestionIndex]}
                    </Text>
                  </View>

                  <Text style={styles.subHeading}>You wrote</Text>
                  <View
                    style={[
                      styles.resultText,
                      {borderColor: compare ? COLORS.success : COLORS.error},
                    ]}>
                    <Text
                      style={[
                        styles.headingText,
                        {color: compare ? COLORS.success : COLORS.error},
                      ]}>
                      {text}
                    </Text>
                  </View>
                  <Text>
                    {currentQuestionIndex == test.length - 1 ? (
                      <TouchableOpacity onPress={() => setReport(true)}>
                        <GradientView
                          colors={[COLORS.success, COLORS.success]}
                          style={[styles.nextButton, {marginTop: 10}]}>
                          <Text style={styles.headingText}>Get Report</Text>
                        </GradientView>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleNext()}>
                        <GradientView
                          colors={[COLORS.primary, COLORS.secondary]}
                          style={[styles.nextButton, {marginTop: 10}]}>
                          <Text style={styles.headingText}>Next Word</Text>
                        </GradientView>
                      </TouchableOpacity>
                    )}
                  </Text>
                </View>
              ) : (
                <View style={styles.textContainer}>
                  <TextInput
                    value={text}
                    onChangeText={e => setText(e)}
                    style={[
                      styles.paragrapgh,
                      styles.textInputStyle,
                      {color: 'black'},
                    ]}
                    placeholder="Enter pronounced word"
                  />
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <GradientView
                      colors={[COLORS.success, COLORS.success]}
                      style={[styles.nextButton, {marginTop: 10}]}>
                      <Text style={styles.headingText}>Submit</Text>
                    </GradientView>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </BackgroundImageApp>
  );
};

export default LevelThree;
