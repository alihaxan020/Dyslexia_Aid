import React, {useState} from 'react';
import {Text, View, TextInput, Alert, TouchableOpacity} from 'react-native';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import ModalApp from '../../components/common/ModalApp';
import GradientView from '../../components/common/GradientView';
import {contactUs} from '../../api/user';
import {COLORS} from '../../constants';
import styles from './styles';
const ContactUs = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const handleContinue = () => setBackModal(true);
  const BackScreen = navigation.goBack;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const wordCount = (text = '') => {
    return text.split(/\S+/).length - 1;
  };
  const handleForm = async () => {
    setDisabled(true);
    const countTitle = wordCount(title);
    const countDescription = wordCount(description);
    if (countTitle >= 5 && countDescription >= 10) {
      setError(false);
      const data = {
        title: title,
        description: description,
      };
      try {
        const res = await contactUs(data);
        console.log(res);
        Alert.alert(
          'Dyslexia Aid',
          'Thank you for contacting us. We will contact you soon',
          [
            {
              text: 'Go Back',
              onPress: () => navigation.navigate('SettingScreen'),
            },
          ],
        );
      } catch (error) {
        console.log(error);
      }
      setDisabled(false);
    } else {
      setError(true);
      setInterval(() => {
        setError(false);
      }, 10000);
      setDisabled(false);
      return;
    }
  };
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Contact Us" BackScreen={handleContinue} />
      <ModalApp
        visible={backModal}
        feedback="Do you want go back?"
        quit={BackScreen}
        continueTest={() => setBackModal(false)}
        quitText="Go Back"
        continueTestText="Continue"
      />
      <View style={styles.bodyContainer}>
        <View style={styles.formContainer}>
          <>
            <View style={styles.textAreaContainer}>
              {error ? (
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={[
                      styles.paragrapgh,
                      {color: 'red', alignItems: 'center'},
                    ]}>
                    Title must be 5 words long
                  </Text>
                </View>
              ) : null}
              <Text style={[styles.paragrapgh, {color: 'black'}]}>Title</Text>
              <TextInput
                style={styles.titleStyle}
                underlineColorAndroid="transparent"
                placeholder="Title of your problem"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={title}
                onChangeText={e => setTitle(e)}
              />
            </View>
            <View style={styles.textAreaContainer}>
              {error ? (
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={[
                      styles.paragrapgh,
                      {color: 'red', alignItems: 'center'},
                    ]}>
                    Description must be 10 words long
                  </Text>
                </View>
              ) : null}
              <Text style={[styles.paragrapgh, {color: 'black'}]}>
                Description
              </Text>
              <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder="Describe your problem"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={description}
                onChangeText={e => setDescription(e)}
              />
            </View>
          </>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleForm()} disabled={disabled}>
              <GradientView
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.nextButton}>
                <Text style={styles.headingText}>Submit</Text>
              </GradientView>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundImageApp>
  );
};

export default ContactUs;
