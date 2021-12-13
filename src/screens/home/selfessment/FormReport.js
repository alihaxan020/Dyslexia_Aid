import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from '../dyslexiatest/writtenTest/styles';
import stylesForm from './stylesForm';
import {icons} from '../../../constants';
const FormReport = props => {
  const [show, setShow] = useState(false);
  const {userData, handleReset} = props;
  const [severity, setSeverity] = useState('');
  const [difficulty, setDifficulty] = useState();
  useEffect(() => {
    console.log(userData);
    if (props.handleSeverity < 4) {
      setSeverity('No Dyslexia');
      setDifficulty(icons.difficultyEasy);
    } else if (props.handleSeverity >= 4 && props.handleSeverity <= 6) {
      setSeverity('Low Dyslexia Severity');
      setDifficulty(icons.difficultyEasy);
    } else if (props.handleSeverity >= 7 && props.handleSeverity <= 8) {
      setSeverity('Medium Dyslexia Severity');
      setDifficulty(icons.difficultyMedium);
    } else {
      setSeverity('High Dyslexia Severity');
      setDifficulty(icons.difficultyHard);
    }
    return () => {
      setSeverity('');
    };
  }, []);
  const handleResetReport = () => {
    setSeverity('');
    setDifficulty();
    handleReset();
  };
  return (
    <ScrollView>
      <View style={[styles.bodyContainer, {justifyContent: 'space-around'}]}>
        <Text style={styles.title}>Form Report</Text>
        <Image source={difficulty} />
        <Text style={styles.title}>{severity}</Text>
        <TouchableOpacity
          style={[styles.submitBtn, {width: '50%', height: '8%'}]}
          onPress={() => setShow(!show)}>
          <Text style={styles.subHeading}>
            {show ? 'Hide' : 'Show'} Responses
          </Text>
        </TouchableOpacity>
        {show ? (
          <View style={stylesForm.userScroll}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {userData.map((item, key) => (
                  <View
                    key={key}
                    style={{
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      borderBottomWidth: 2,
                      width: '95%',
                    }}>
                    <Text style={styles.subHeading}>
                      Question: {item.question}
                    </Text>
                    <Text
                      style={[
                        styles.paragrapgh,
                        {color: item.answer == 'Yes' ? '#54ff00' : '#ff891f'},
                      ]}>
                      Answer: {item.answer}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={stylesForm.btnStyle}
            onPress={() => handleResetReport()}>
            <Text
              style={[
                styles.subHeading,
                {textAlign: 'center', justifyContent: 'center'},
              ]}>
              Retry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[stylesForm.btnStyle]}
            onPress={() => console.log('Show Options')}>
            <Text
              style={[
                styles.subHeading,
                {textAlign: 'center', justifyContent: 'center'},
              ]}>
              Save Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormReport;
