import React, {useState} from 'react';
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
import GradientView from '../../../../components/common/GradientView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const BackScreen = navigation.goBack;
  console.log(score);
  return (
    <ImageBackground
      source={images.backgroundApp}
      style={{flex: 1}}
      resizeMode="cover">
      <HeaderTest headerText="Verbal Test" BackScreen={BackScreen} />
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
              console.log(allQuestions[currentQuestionIndex]?.question)
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
                      <View style={styles.optionView}>
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
                      </View>
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
      </View>
    </ImageBackground>
  );
};

export default VerbalTest;
