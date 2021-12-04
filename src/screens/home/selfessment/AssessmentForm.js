import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import TextToSpeech from '../../../components/common/TextToSpeech';
import SpeechSettingModal from '../../../components/common/SpeechSettingModal';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
import ModalApp from '../../../components/common/ModalApp';
import HeaderTest from '../../../components/common/HeaderTest';
import Progress from '../../../components/common/Progress';
import styles from '../dyslexiatest/writtenTest/styles';
import stylesForm from './stylesForm';
import FormReport from './FormReport';
import {images} from '../../../constants';

const data = [
  {
    question: 'Do you try to avoid reading and writing whenever possible?',
    options: ['Yes', 'No'],
  },
  {
    question:
      'Do you struggle to remember things such as a PIN or telephone number?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you face confusion in the order of letters in words?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you face problems learning the names and sounds of letters?',
    options: ['Yes', 'No'],
  },
  {
    question:
      'Do you face answering questions well orally, but having difficulty writing the answer down?',
    options: ['Yes', 'No'],
  },
  {
    question:
      'Do you struggle to learn sequences, such as days of the week or the alphabets?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you have slow writing speed?',
    options: ['Yes', 'No'],
  },
  {
    question:
      "You have problem mispronouncing words, such as 'Aminal' to 'Animal'?",
    options: ['Yes', 'No'],
  },
  {
    question:
      'You have trouble telling directions such as east or west, left or right?',
    options: ['Yes', 'No'],
  },
  {
    question: 'You have problems with rhyming words?',
    options: ['Yes', 'No'],
  },
];

const AssessmentForm = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState([]);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechModal, setSpeechModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userData, setUserData] = useState([]);
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
  const BackScreen = navigation.goBack;
  useEffect(() => {
    setQuestion(data);
  }, []);

  const selectedOption = option => {
    let objectData = {
      question: question[currentQuestionIndex].question,
      answer: option,
    };
    setUserData([...userData, objectData]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    speakRef.current.stopSpeaker();
  };
  const handleResetForm = () => {
    setCurrentQuestionIndex(0);
    setStart(true);
    setUserData([]);
  };
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Assessment Form" BackScreen={handleContinue} />
      <ModalApp
        visible={backModal}
        feedback=" Do you want quit the Written Test?"
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

      <TextToSpeech ref={speakRef} />
      <View style={styles.bodyContainer}>
        {start ? (
          <View style={stylesForm.formcontainer}>
            {currentQuestionIndex == '10' ? (
              <FormReport userData={userData} handleReset={handleResetForm} />
            ) : (
              <>
                <View style={stylesForm.questionContainer}>
                  <View
                    style={{
                      height: '30%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.headingText,
                        {alignSelf: 'center', marginBottom: 5},
                      ]}>
                      Question {currentQuestionIndex + 1}/{question.length}
                    </Text>
                    <View style={{width: '90%', marginHorizontal: '5%'}}>
                      <Progress
                        step={currentQuestionIndex}
                        steps={question.length}
                        height={10}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: '70%',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                    }}>
                    <View style={{paddingHorizontal: '3%'}}>
                      <Text
                        style={[
                          styles.paragrapgh,
                          {
                            alignSelf: 'center',
                            marginBottom: 5,
                            paddingTop: 10,
                          },
                        ]}>
                        {question[currentQuestionIndex].question}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          speakRef.current.getAlert(
                            question[currentQuestionIndex].question,
                          )
                        }>
                        <Image
                          source={images.listenicon}
                          style={stylesForm.listenImage}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSpeechModal(true)}>
                        <Image
                          source={images.voiceSetting}
                          style={[stylesForm.listenImage, {tintColor: 'white'}]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={stylesForm.optionInstructions}>
                  <Text style={styles.headingText}>
                    Please select the option:
                  </Text>
                </View>
                <View style={stylesForm.optionContainer}>
                  {question[currentQuestionIndex]?.options.map((item, key) => (
                    <TouchableOpacity
                      onPress={() => selectedOption(item)}
                      key={key}>
                      <View style={stylesForm.optionView}>
                        <Text style={[styles.headingText, {color: 'black'}]}>
                          {item}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        ) : (
          <View
            style={[
              styles.instructionContainer,
              {
                width: '95%',
                height: '100%',
              },
            ]}>
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
                  onPress={() => speakRef.current.getAlert('Ali Hassan')}>
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
            <Text style={styles.title}>Assessment Form</Text>
            <Text style={[styles.headingText, {textAlign: 'center'}]}>
              Instructions
            </Text>
            <Text style={[styles.paragrapgh, {textAlign: 'center'}]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>

            <TouchableOpacity
              style={[styles.submitBtn, {width: '40%', height: '8%'}]}
              onPress={() => setStart(true)}>
              <Text style={styles.subHeading}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BackgroundImageApp>
  );
};

export default AssessmentForm;
