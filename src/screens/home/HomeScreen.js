import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {images, COLORS, SIZES, FONTS} from '../../constants';
import ViewCard from '../../components/common/ViewCard';
import {useLogin} from '../../context/LoginProvider';
import FastImage from 'react-native-fast-image';
import profile from '../../../assets/images/user.png';
import BackgroundImageApp from '../../components/common/BackgroundImageApp';
const profileUri = Image.resolveAssetSource(profile).uri;

const HomeScreen = ({navigation}) => {
  const {userInfo} = useLogin();
  console.log(userInfo);
  // console.log(navigation.navigate('HistroyStack'));
  return (
    <BackgroundImageApp>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.userIcon}>
          <FastImage
            source={{
              uri: userInfo.avatar ? userInfo.avatar : profileUri,
              headers: {Authorization: userInfo._id},
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{
              height: 75,
              width: 75,
              borderRadius: 75 / 2,
              overflow: 'hidden',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={{...FONTS.h1, fontWeight: 'bold'}}>
          Welcome {userInfo.name}!
        </Text>
      </View>
      <View
        style={{
          marginTop: SIZES.radius,
          flex: 1,
          backgroundColor: COLORS.primaryOpacity,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}>
        <View style={[styles.viewCardContainer, {marginTop: SIZES.padding2}]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DyslexicTestStack')}>
            <ViewCard
              bgColor={COLORS.lightCoral}
              delay={300}
              title="Dyslexia Test"
              style={styles.titleStyle}
              iconImage={images.dyslexiatest}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AssessmentFormStack')}>
            <ViewCard
              bgColor={COLORS.lightGreen}
              delay={500}
              title="Self Assessment"
              style={styles.titleStyle}
              iconImage={images.assessmentIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewCardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ReadingStack')}>
            <ViewCard
              bgColor={COLORS.lightOrange}
              delay={700}
              title="Reading Improvements"
              style={styles.titleStyle}
              iconImage={images.selfassessment}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Save Document')}>
            <ViewCard
              bgColor={COLORS.lightGoldenrod}
              delay={900}
              title="Saved Documents"
              style={styles.titleStyle}
              iconImage={images.saveDocumentIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar translucent backgroundColor={'#ffffff00'} />
    </BackgroundImageApp>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  userIcon: {
    marginTop: SIZES.height * 0.09,
    marginBottom: SIZES.base,
    width: 82,
    height: 82,
    borderRadius: 41,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    elevation: 5,
  },
  viewCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
  },
  titleStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
