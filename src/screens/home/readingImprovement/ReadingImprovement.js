import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {images, icons, SIZES, COLORS} from '../../../constants';
import HeaderTest from '../../../components/common/HeaderTest';
import GradientView from '../../../components/common/GradientView';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
const ReadingImprovement = ({navigation}) => {
  const BackScreen = navigation.goBack;
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Reading improvement" BackScreen={BackScreen} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <GradientView
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.bodyContainer}
          start={{x: 0, y: 0.8}}
          end={{x: 1, y: 1}}>
          <View style={[styles.viewContainer, {backgroundColor: 'white'}]}>
            <View style={styles.viewChildOne}>
              <Image source={icons.tapIcon} style={styles.imageStyle} />
            </View>
            <View style={styles.viewChildTwo}>
              <Text style={[styles.titleText, {color: 'blue'}]}>
                Tap to Speak
              </Text>
              <Text style={[styles.subTitle, {color: 'blue'}]}>
                Tap on the icon to listen to the word written on it
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('VerbalTest')}
                style={styles.buttonStyle}>
                <Text style={[styles.titleText]}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.viewContainer, {backgroundColor: 'white'}]}>
            <View style={styles.viewChildOne}>
              <Image source={icons.practiceIcon} style={styles.imageStyle} />
            </View>
            <View style={styles.viewChildTwo}>
              <Text style={[styles.titleText, {color: 'blue'}]}>
                Listen & Practice
              </Text>
              <Text style={styles.subTitle}>
                Top on the icon to listen to word written on it
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('VerbalTest')}
                style={styles.buttonStyle}>
                <Text style={[styles.titleText]}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GradientView>
      </View>
    </BackgroundImageApp>
  );
};

export default ReadingImprovement;

const styles = StyleSheet.create({
  bodyContainer: {
    height: SIZES.height * 0.78,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.padding2 * 1.5,
    borderTopRightRadius: SIZES.padding2 * 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    height: '25%',
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 24,
    shadowColor: 'black',
    shadowRadius: 16.0,
    borderRadius: 10,
  },
  viewChildOne: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildTwo: {
    height: '100%',
    width: '55%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageStyle: {width: '80%', height: '70%', resizeMode: 'cover'},
  titleText: {
    fontSize: SIZES.padding,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    color: 'blue',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '20%',
    backgroundColor: 'green',
    borderRadius: 30,
  },
});
