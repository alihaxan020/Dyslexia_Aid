import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {useEvent} from 'react-native-reanimated';
import BottomSheet from '../../components/common/BottomSheet';
import SpeechSettingModal from '../../components/common/SpeechSettingModal';
import AppLoader from '../../components/common/AppLoader';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import TextToSpeech from '../../components/common/TextToSpeech';
import ModalApp from '../../components/common/ModalApp';
import {images, COLORS, SIZES} from '../../constants';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import ViewCard from '../../components/common/ViewCard';
import DocumentPicker from 'react-native-document-picker';
const CamerScreen = ({navigation}) => {
  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      return true;
    }
  };
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
    openSheet();
  }, []);
  const sheetRef = useRef(null);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const [text, setText] = useState();
  const [butext, setButext] = useState('upload photo or a document');
  const [localFile, setLocalFile] = useState();
  const [load, setLoad] = useState(null);

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: `'<h1>${text}</h1>'`,
        //File Name
        fileName: 'myfile' + '-' + Date.now(),
        //File directory
        directory: 'documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      if (file.filePath == ' ') {
        alert('file not saved');
      } else {
        alert('file saved');
      }
    }
  };

  const onFileSelected = async image => {
    closeSheet();
    setLocalFile(image);
    setLoad(true);
    const formData = new FormData();
    const data = {
      uri: image.path,
      type: image.mime,
      name: 'myImage' + '-' + Date.now() + '.jpg',
    };

    formData.append('image', data);

    fetch('http://192.168.43.220:6000/api/textrecognize', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        setText(JSON.stringify(response.textimage));
        setLoad(false);
        setButext('upload another image or a document');
      })
      .catch(e => {});
    console.log('error');
  };
  if (load == null) {
    return (
      <BackgroundImageApp>
        <HeaderTest headerText="Image to Text" BackScreen={handleContinue} />
        <ModalApp
          visible={backModal}
          feedback=" Do you want quit the text extraction?"
          quit={BackScreen}
          continueTest={() => setBackModal(false)}
          quitText="Go Back"
          continueTestText="Continue"
        />

        <View
          style={{
            marginTop: SIZES.radius,
            flex: 1,
            backgroundColor: COLORS.primaryOpacity,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
          }}>
          <View style={[styles.viewCardContainer, {marginTop: SIZES.padding2}]}>
            <TouchableOpacity style={styles.buttT} onPress={openSheet}>
              <Text>{butext}</Text>
            </TouchableOpacity>
            <BottomSheet ref={sheetRef} onFileSelected={onFileSelected} />
          </View>
        </View>
      </BackgroundImageApp>
    );
  }
  if (load == false) {
    return (
      <BackgroundImageApp>
        <HeaderTest headerText="Image to Text" BackScreen={handleContinue} />
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
            <Text style={styles.text}>{text}</Text>
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
            onPress={() => speakRef.current.getAlert(text)}>
            <Image style={styles.listenImage} source={images.listenicon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => setSpeechModal(true)}>
            <Image style={styles.speechSettings} source={images.voiceSetting} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '10%',
            marginLeft: '20%',
            marginRight: '20%',
          }}>
          <TouchableOpacity style={styles.butt} onPress={openSheet}>
            <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
              {butext}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttone}
            onPress={() => navigation.navigate('Summarizer', {texts: text})}>
            <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
              Summarize Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.butttwo} onPress={createPDF}>
            <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
              Save as a document
            </Text>
          </TouchableOpacity>
          <BottomSheet ref={sheetRef} onFileSelected={onFileSelected} />
        </View>
      </BackgroundImageApp>
    );
  }

  if (load == true) {
    return (
      <BackgroundImageApp>
        <HeaderTest headerText="Image to Text" BackScreen={handleContinue} />
        <View style={styles.Container}>
          <AppLoader />
        </View>
      </BackgroundImageApp>
    );
  }
  return <View style={styles.Container}></View>;
};

export default CamerScreen;

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
