import React, {useState} from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
import HeaderTest from '../../components/common/HeaderTest';
import ModalApp from '../../components/common/ModalApp';
import styles from './styles';
const ContactUs = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const handleContinue = () => setBackModal(true);
  const BackScreen = navigation.goBack;

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
              <Text style={(styles.title, {color: 'black'})}>Title</Text>
              <TextInput
                style={styles.titleStyle}
                underlineColorAndroid="transparent"
                placeholder="Describe your problem"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
              />
            </View>
            <View style={styles.textAreaContainer}>
              <Text style={(styles.title, {color: 'black'})}>Description</Text>
              <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder="Describe your problem"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
              />
            </View>
          </>
        </View>
      </View>
    </BackgroundImageApp>
  );
};

export default ContactUs;
