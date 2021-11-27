import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {images, COLORS} from '../../../../constants';
import HeaderTest from '../../../../components/common/HeaderTest';
import ModalApp from '../../../../components/common/ModalApp';
import GradientView from '../../../../components/common/GradientView';
import TextToSpeech from '../../../../components/common/TextToSpeech';
import Report from './Report';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  BounceIn,
} from 'react-native-reanimated';
const data = [
  {
    question: 'What’s the biggest planet in our solar system?',
    options: ['Jupiter', 'Saturn', 'Neptune', 'Mercury'],
    correct_option: 'Jupiter',
  },
  {
    question: 'What attraction in India is one of the famus in the world?',
    options: ['Chand Minar', 'Taj Mahal', 'Stadium'],
    correct_option: 'Taj Mahal',
  },
  {
    question: 'What land animal can open its mouth the widest?',
    options: ['Alligator', 'Crocodile', 'Baboon', 'Hippo'],
    correct_option: 'Hippo',
  },
  {
    question: 'What is the largest animal on Earth?',
    options: [
      'The African elephant',
      'The blue whale',
      'The sperm whale',
      'The giant squid',
    ],
    correct_option: 'The blue whale',
  },
  {
    question: 'What is the only flying mammal?',
    options: ['The bat', 'The flying squirrel', 'The bald eagle', 'The colugo'],
    correct_option: 'The bat',
  },
];

const VerbalTest = ({navigation}) => {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [backModal, setBackModal] = useState(false);
  const [report, setReport] = useState(false);
  const speakRef = useRef();
  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    speakRef.current.stopSpeaker();
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  };
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  };

  const BackScreen = navigation.goBack;
  const handleContinue = () => setBackModal(true);
  return (
    <ImageBackground
      source={images.backgroundApp}
      style={{flex: 1}}
      resizeMode="cover">
      <HeaderTest headerText="Verbal Test" BackScreen={handleContinue} />
      <TextToSpeech ref={speakRef} />
      <ModalApp
        visible={backModal}
        feedback=" Do you want quit the Dyslexic Test?"
        quit={BackScreen}
        continueTest={() => setBackModal(false)}
        quitText="Go Back"
        continueTestText="Continue"
      />
      {report ? (
        <Report />
      ) : (
        <View style={styles.bodyContainer}>
          {/* instruction Container */}
          <View style={styles.instructionContainer}>
            <Text style={styles.headingText}>
              Press the below button to listen word
            </Text>
            <Text style={styles.levelText}>Level 1</Text>
            <GradientView
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.questionCount}>
              <Text style={styles.subHeading}>
                {currentQuestionIndex + 1}/{allQuestions.length}
              </Text>
            </GradientView>
          </View>
          {/* Body options Section  */}
          <View style={styles.optionsSection}>
            <TouchableOpacity
              onPress={() =>
                speakRef.current.getAlert(
                  allQuestions[currentQuestionIndex]?.question,
                )
              }>
              <Image style={styles.listenImage} source={images.listenicon} />
            </TouchableOpacity>
            <Text style={styles.headingText}>Select the correct option</Text>
            <View style={styles.optionContainer}>
              <View style={styles.optionContainer}>
                {allQuestions[currentQuestionIndex]?.options.map(option => (
                  <View key={option}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}>
                        <Animated.View
                          style={styles.optionView}
                          entering={SlideInLeft.duration(600)
                            .springify()
                            .damping(10)
                            .stiffness(50)}
                          exiting={SlideOutLeft.duration(500)}>
                          <Text style={styles.optionText}>{option}</Text>
                          {option == correctOption ? (
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: COLORS.success,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <MaterialCommunityIcons
                                name="check"
                                style={{
                                  color: COLORS.black,
                                  fontSize: 20,
                                }}
                              />
                            </View>
                          ) : option == currentOptionSelected ? (
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: COLORS.error,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <MaterialCommunityIcons
                                name="close"
                                style={{
                                  color: COLORS.white,
                                  fontSize: 20,
                                }}
                              />
                            </View>
                          ) : null}
                        </Animated.View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {showNextButton ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleNext}>
                <GradientView
                  colors={[COLORS.primary, COLORS.secondary]}
                  style={styles.nextButton}>
                  <Text style={styles.headingText}>Next</Text>
                </GradientView>
              </TouchableOpacity>
            </View>
          ) : null}
          <ModalApp
            visible={showScoreModal}
            quit={restartQuiz}
            continueTest={() => setReport(true)}
            feedback={
              score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'
            }
            totalScore={allQuestions.length}
            obtainedScore={score}
            scoreModal={true}
            quitText="Retry Test"
            continueTestText="Get Report"
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default VerbalTest;
