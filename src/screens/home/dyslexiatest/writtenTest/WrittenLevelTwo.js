import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import BackgroundImageApp from '../../../../components/common/BackgroundImageApp';
import ModalApp from '../../../../components/common/ModalApp';
import HeaderTest from '../../../../components/common/HeaderTest';
import GradientView from '../../../../components/common/GradientView';
import {COLORS, icons} from '../../../../constants';
import Voice from '@react-native-community/voice';
import Report from '../../../../components/dyslexicTest/Report';
import {getWrittenTest} from '../../../../api/dyslexiaTest';
import AppLoader from '../../../../components/common/AppLoader';
import styles from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const WrittenLevelTwo = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [test, setTest] = useState([]);
  const [question, setQuestion] = useState(0);
  const [check, setCheck] = useState(false);
  const [score, setScore] = useState(0);
  const [compare, setCompare] = useState(false);
  const [report, setReport] = useState(false);
  const [speechEnd, setSpeechEnd] = useState(false);
  const [fetch, setfetch] = useState(true);
  const BackScreen = navigation.goBack;
  const handleContinue = () => setBackModal(true);
  useEffect(() => {
    const postUserScore = async () => {
      const test = 'Written';
      const level = 'Level 2';
      const data = {
        test,
        level,
      };
      const res = await getWrittenTest(data);
      console.log(res.data[0].verbalQuestions);
      setTest(res.data[0].verbalQuestions);
      setfetch(false);
    };
    postUserScore();
  }, []);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStartHandler = e => {};
  const onSpeechEndHandler = e => {
    setLoading(false);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
  };
  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
      setSpeechEnd(true);
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setCheck(true);
      widthSet.value = 0;
      let compareResult = result.toLowerCase() == test[question].toLowerCase();
      compileResult(compareResult);
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const compileResult = compareResult => {
    setCompare(compareResult);
    compareResult ? setScore(prevState => prevState + 1) : setScore(score);
  };
  const handleNext = () => {
    setCheck(false);
    setResult('');
    setQuestion(question + 1);
    setSpeechEnd(false);
    widthSet.value = 1;
  };
  const nextLevel = () => navigation.navigate('WrittenLevelThree');
  const handleReset = () => {
    setResult('');
    setScore(0);
    setQuestion(0);
    setCheck(false);
    setReport(false);
    setCompare(false);
    widthSet.value = 1;
  };
  const widthSet = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(widthSet.value * styles.textContainer.width, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Level 2" BackScreen={handleContinue} />
      {fetch ? (
        <AppLoader />
      ) : (
        <>
          <ModalApp
            visible={backModal}
            feedback=" Do you want quit the Written Test?"
            quit={BackScreen}
            continueTest={() => setBackModal(false)}
            quitText="Go Back"
            continueTestText="Continue"
          />
          <View style={styles.bodyContainer}>
            {report ? (
              <Report
                test="Written"
                resetTest={handleReset}
                nextLevel={nextLevel}
                obtainedScore={score}
                totalScore={test.length}
                level="Level 2"
              />
            ) : (
              <>
                <View style={styles.instructionContainer}>
                  <Text style={styles.title}>Level 2</Text>
                  <GradientView
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={styles.questionCount}>
                    <Text style={styles.subHeading}>
                      {question + 1}/{test.length}
                    </Text>
                  </GradientView>
                  <Animated.View
                    style={[styles.textContainer, reanimatedStyle]}>
                    <Text style={[styles.headingText, {color: COLORS.black}]}>
                      {test[question]}
                    </Text>
                  </Animated.View>
                  <Text style={styles.paragrapgh}>
                    Press on the button blow & and read the word loud
                  </Text>
                </View>
                <View style={styles.speakContainer}>
                  {check ? null : (
                    <>
                      <View style={styles.textInputStyle}>
                        <TextInput
                          value={result}
                          style={[styles.paragrapgh, {color: 'black'}]}
                          secureTextEntry
                        />

                        {isLoading ? (
                          <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={startRecording}
                            disabled={check}>
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
                      {speechEnd ? (
                        <TouchableOpacity
                          style={styles.submitBtn}
                          onPress={stopRecording}
                          disabled={check}>
                          <Text style={styles.headingText}>Submit</Text>
                        </TouchableOpacity>
                      ) : null}
                    </>
                  )}
                  {check ? (
                    <View style={styles.resultContainer}>
                      <Text style={styles.title}> Result</Text>
                      <View
                        style={{
                          width: '45%',
                          height: '17%',
                          borderRadius: 20,
                          borderWidth: 3,
                          borderColor: compare ? COLORS.success : COLORS.error,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.subHeading]}>
                          {compare ? 'Correct Answer' : 'Wrong Answer'}
                        </Text>
                      </View>
                      <Text style={styles.headingText}> You speak</Text>
                      <View
                        style={{
                          width: '45%',
                          height: '17%',
                          borderRadius: 20,
                          borderWidth: 3,
                          borderColor: compare ? COLORS.success : COLORS.error,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.headingText}>{result}</Text>
                      </View>

                      {question < 4 ? (
                        <TouchableOpacity
                          style={[
                            styles.submitBtn,
                            {width: '30%', height: '15%'},
                          ]}
                          onPress={handleNext}>
                          <Text style={styles.headingText}>Next</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[
                            styles.submitBtn,
                            {width: '35%', height: '15%'},
                          ]}
                          onPress={() => setReport(true)}>
                          <Text style={styles.headingText}>Get Report</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </View>
        </>
      )}
    </BackgroundImageApp>
  );
};

export default WrittenLevelTwo;
