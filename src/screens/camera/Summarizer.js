import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import BottomSheet from '../../components/common/BottomSheet';
import SpeechSettingModal from '../../components/common/SpeechSettingModal';
import AppLoader from '../../components/common/AppLoader';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import TextToSpeech from '../../components/common/TextToSpeech';
import ModalApp from '../../components/common/ModalApp';
import {images, COLORS, SIZES} from '../../constants';

const Summarizer = ({route, navigation}) => {
  const [rawtext, setText] = useState(route.params.texts);
  const [saveText, setSaveText] = useState();
  const [loader, setLoader] = useState(true);
  const [backModal, setBackModal] = useState(false);
  const handleContinue = () => setBackModal(true);
  const BackScreen = navigation.goBack;
  const [speechModal, setSpeechModal] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.5);
  const [speechPitch, setSpeechPitch] = useState(1);
  const speakRef = useRef();
  const handleSpeechRate = async rate => {
    speakRef.current.setSpeechRate(rate);
    setSpeechRate(rate);
  };
  const handleSpeechPitch = async rate => {
    speakRef.current.setSpeechPitch(rate);
    setSpeechPitch(rate);
  };
  useEffect(() => {
    summApi();
  });
  const summApi = () => {
    var data = new FormData();
    data.append('rawtext', rawtext);
    fetch('http://192.168.43.220:6000/api/analyze', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        setSaveText(response.summ);
        setLoader(false);
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.Container}>
      {loader ? (
        <AppLoader />
      ) : (
        <BackgroundImageApp>
          <HeaderTest headerText="Summary" BackScreen={handleContinue} />
          <ModalApp
            visible={backModal}
            feedback=" Do you want quit the Dyslexic Test?"
            quit={BackScreen}
            continueTest={() => setBackModal(false)}
            quitText="Go Back"
            continueTestText="Continue"
          />
          <View style={styles.Containert}>
            <ScrollView style={styles.scroll} scrollEnabled={true}>
              <Text style={styles.text}>{saveText}</Text>
            </ScrollView>
          </View>
          <TextToSpeech ref={speakRef} />
          <SpeechSettingModal
            visible={speechModal}
            handleSpeechPitch={handleSpeechPitch}
            handleSpeechRate={handleSpeechRate}
            speechRate={speechRate}
            speechPitch={speechPitch}
            setSpeechModal={setSpeechModal}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: '10%',
              marginTop: '5%',
              marginLeft: '4%',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => speakRef.current.getAlert(saveText)}>
              <Image style={styles.listenImage} source={images.listenicon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => setSpeechModal(true)}>
              <Image
                style={styles.speechSettings}
                source={images.voiceSetting}
              />
            </TouchableOpacity>
          </View>
        </BackgroundImageApp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Containert: {
    height: '50%',
  },
  scroll: {
    backgroundColor: '#8e44ad',
    margin: 10,
    borderRadius: 20,
  },
  butt: {
    borderWidth: 1,
    borderColor: '#572da6',
    width: '50%',
    height: '100%',
    backgroundColor: '#572da6',
    textAlign: 'center',
    alignItems: 'center',
    padding: '2%',
    margin: '1%',
    borderRadius: 15,
  },
  buttT: {
    borderWidth: 1,
    borderColor: 'white',
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    padding: '5%',
    margin: '5%',
    borderRadius: 15,
  },
  buttone: {
    borderWidth: 1,
    borderColor: '#572da6',
    width: '50%',
    height: '100%',
    backgroundColor: '#572da6',
    textAlign: 'center',
    alignItems: 'center',
    padding: '2%',
    margin: '1%',
    borderRadius: 15,
  },
  butttwo: {
    borderWidth: 1,
    borderColor: '#572da6',
    width: '50%',
    height: '100%',
    backgroundColor: '#572da6',
    textAlign: 'center',
    alignItems: 'center',
    padding: '2%',
    margin: '1%',
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
    margin: '1%',
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  listenImage: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
    borderRadius: (SIZES.width * 0.2) / 2,
    borderWidth: 1,
    borderColor: 'black',
    resizeMode: 'cover',
  },
  speechSettings: {
    width: SIZES.width * 0.18,
    height: SIZES.width * 0.18,
    borderRadius: (SIZES.width * 0.18) / 2,
    resizeMode: 'cover',
  },
  viewCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
  },
});

export default Summarizer;
