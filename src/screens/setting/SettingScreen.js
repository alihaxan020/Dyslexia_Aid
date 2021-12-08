import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import GradientView from '../../components/common/GradientView';
import FastImage from 'react-native-fast-image';
import {images, COLORS} from '../../constants';
import profile from '../../../assets/images/user.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {useLogin} from '../../context/LoginProvider';
import {signOut} from '../../api/user';
const profileUri = Image.resolveAssetSource(profile).uri;
const SettingScreen = ({navigation}) => {
  const {userInfo, setLoginPending, setIsLoggedIn} = useLogin();
  return (
    <ImageBackground source={images.background} style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{userInfo.name}</Text>
        </View>
        <GradientView
          colors={[COLORS.primary, COLORS.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientContainer}>
          <View>
            <View style={styles.userIcon}>
              <FastImage
                source={{
                  uri: userInfo.avatar ? userInfo.avatar : profileUri,
                  headers: {Authorization: userInfo._id},
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={styles.userImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="format-font"
                size={30}
                color="white"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.subHeading}>Font Setting</Text>
              <Text style={[styles.paragrapgh, {fontWeight: '300'}]}>
                Change the font size
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                source={images.arrowRight}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewContainer}
            onPress={() => navigation.navigate('RateUs')}>
            <View style={styles.iconView}>
              <AntDesign name="like1" size={30} color="white" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.subHeading}>Rate Us</Text>
              <Text style={[styles.paragrapgh, {fontWeight: '300'}]}>
                Change the font size
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                source={images.arrowRight}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewContainer}
            onPress={() => navigation.navigate('ContactUs')}>
            <View style={styles.iconView}>
              <MaterialIcons name="contact-support" size={30} color="white" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.subHeading}>Contact Us</Text>
              <Text style={[styles.paragrapgh, {fontWeight: '300'}]}>
                Change the font size
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                source={images.arrowRight}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewContainer}
            onPress={() => navigation.navigate('TermsScreen')}>
            <View style={styles.iconView}>
              <FontAwesome name="clipboard" size={30} color="white" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.subHeading}>Terms & Conditions</Text>
              <Text style={[styles.paragrapgh, {fontWeight: '300'}]}>
                Change the font size
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                source={images.arrowRight}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewContainer}
            onPress={async () => {
              setLoginPending(true);
              const isLoggedOut = await signOut();
              if (isLoggedOut) {
                setIsLoggedIn(false);
                setLoginPending(false);
              }
              setLoginPending(false);
            }}>
            <View style={styles.iconView}>
              <AntDesign name="logout" size={30} color="white" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.subHeading}>Log Out</Text>
              <Text style={[styles.paragrapgh, {fontWeight: '300'}]}>
                Change the font size
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                source={images.arrowRight}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.socialContainer}>
            <Text style={styles.subHeading}>Follow us on social medias</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '60%',
                justifyContent: 'space-evenly',
              }}>
              <Image source={images.facebook} style={styles.icon} />

              <Image
                source={images.twitter}
                style={[styles.icon, {backgroundColor: 'white'}]}
              />
              <Image source={images.instagram} style={styles.icon} />
            </View>
          </View>
        </GradientView>
      </View>
    </ImageBackground>
  );
};

export default SettingScreen;
