import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {images, SIZES, COLORS} from '../../../constants';
import HeaderTest from '../../../components/common/HeaderTest';
import GradientView from '../../../components/common/GradientView';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
const DyslexicTest = ({navigation}) => {
  const BackScreen = navigation.goBack;
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Dyslexic Test" BackScreen={BackScreen} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <GradientView
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.bodyContainer}
          start={{x: 0, y: 0.8}}
          end={{x: 1, y: 1}}>
          <View
            style={[
              styles.viewContainer,
              {backgroundColor: COLORS.lightGoldenrod},
            ]}>
            <View style={styles.viewChildOne}>
              <Image source={images.testIcon} style={styles.imageStyle} />
            </View>
            <View style={styles.viewChildTwo}>
              <Text style={styles.titleText}>Verbal Test</Text>
              <Text style={styles.subTitle}>
                A test to assess your verbal skills
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('VerbalTest')}
                style={styles.buttonStyle}>
                <Text style={styles.titleText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[styles.viewContainer, {backgroundColor: COLORS.darkgreen}]}>
            <View style={styles.viewChildOne}>
              <Image source={images.testIcon} style={styles.imageStyle} />
            </View>
            <View style={styles.viewChildTwo}>
              <Text style={styles.titleText}>Written Test</Text>
              <Text style={styles.subTitle}>
                A test to assess your writing skills
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WrittenTest')}
                style={styles.buttonStyle}>
                <Text style={styles.titleText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GradientView>
      </View>
    </BackgroundImageApp>
  );
};

export default DyslexicTest;

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
    borderRadius: SIZES.padding2 * 1.5,
  },
  viewChildOne: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildTwo: {
    flex: 1,
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
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '25%',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
  },
});
