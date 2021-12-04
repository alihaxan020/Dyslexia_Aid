import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../dyslexiatest/writtenTest/styles';
import stylesForm from './stylesForm';
const FormReport = props => {
  const [show, setShow] = useState(false);
  const {userData, handleReset} = props;
  return (
    <ScrollView>
      <View style={[styles.bodyContainer, {justifyContent: 'space-around'}]}>
        <Text style={styles.title}>Form Report</Text>
        <TouchableOpacity
          style={[styles.submitBtn, {width: '50%', height: '8%'}]}
          onPress={() => setShow(!show)}>
          <Text style={styles.subHeading}>
            {show ? 'Show' : 'Hide'} Responses
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
                    <Text style={styles.paragrapgh}>Answer: {item.answer}</Text>
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
            onPress={() => handleReset()}>
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
