import React, {useState} from 'react';
import {Text, View} from 'react-native';
import BackgroundImageApp from '../../../../components/common/BackgroundImageApp';
import ModalApp from '../../../../components/common/ModalApp';
import HeaderTest from '../../../../components/common/HeaderTest';
import GradientView from '../../../../components/common/GradientView';
import {COLORS} from '../../../../constants';
import styles from './styles';
const WrittenTest = ({navigation}) => {
  const [backModal, setBackModal] = useState(false);
  const BackScreen = navigation.goBack;
  const handleContinue = () => setBackModal(true);
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Written Test" BackScreen={handleContinue} />
      <ModalApp
        visible={backModal}
        feedback=" Do you want quit the Written Test?"
        quit={BackScreen}
        continueTest={() => setBackModal(false)}
        quitText="Go Back"
        continueTestText="Continue"
      />
      <View style={styles.instructionContainer}>
        <Text style={styles.levelText}>Level 1</Text>
        <GradientView
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.questionCount}>
          <Text style={styles.subHeading}>1/3</Text>
        </GradientView>
        <View style={styles.textContainer}>
          <Text style={styles.levelText}>Ali Hassan</Text>
        </View>
        <Text style={styles.subHeading}>
          Press on the button blow & and read the word loud
        </Text>
      </View>
    </BackgroundImageApp>
  );
};

export default WrittenTest;
