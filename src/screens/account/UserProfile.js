import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, ImageBackground} from 'react-native';
import Chart from '../../components/dyslexicTest/Chart';
import styles from './styles';
import {images, COLORS, icons, SIZES} from '../../constants';
import {useLogin} from '../../context/LoginProvider';
import GradientView from '../../components/common/GradientView';
import Profile from '../../../assets/images/user.png';
import {postUsersScroes} from '../../api/user';
import LottieView from 'lottie-react-native';
import {set} from 'react-native-reanimated';

const profileUri = Image.resolveAssetSource(Profile).uri;

const UserProfile = () => {
  const {setUserInfo, userInfo} = useLogin();
  const [written, setWritten] = useState();
  const [verbal, setVerbal] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const postUserScore = async () => {
      const resWritten = await postUsersScroes('Written');
      const resVerbal = await postUsersScroes('Verbal');
      setWritten(resWritten.data);
      setVerbal(resVerbal.data);
      setCheck(true);
    };
    postUserScore();
  }, []);
  return (
    <ImageBackground style={{flex: 1}} source={images.background}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: userInfo.avatar ? userInfo.avatar : profileUri,
            }}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.headingText}>{userInfo.name}</Text>
      </View>
      <View>
        <ScrollView
          style={{
            marginBottom: '65%',
          }}>
          <View
            style={[
              {
                backgroundColor: COLORS.primarybg,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                flexDirection: 'column',
                alignItems: 'center',
                width: SIZES.width,
                height: SIZES.height,
              },
            ]}>
            <View
              style={{
                width: SIZES.width,
                height: SIZES.height * 0.05,
                alignItems: 'center',
                marginTop: SIZES.height * 0.05,
              }}>
              <Text style={[styles.headingText, {color: 'black'}]}>
                Progress Statistics
              </Text>
            </View>
            <View
              style={{
                width: SIZES.width * 0.4,
                height: SIZES.height * 0.2,
                backgroundColor: COLORS.primarybg,
                borderTopWidth: 2,
              }}>
              <LottieView
                source={require('../../../assets/icons/statistics.json')}
                autoPlay
                loop
              />
            </View>
            <View
              style={{
                width: SIZES.width * 0.5,
                height: SIZES.height * 0.05,
                alignItems: 'center',
                marginTop: SIZES.height * 0.02,
              }}>
              <Text style={[styles.headingText, {color: 'black'}]}>
                Verbal Test Statistics
              </Text>
            </View>
            <View
              style={{
                width: SIZES.width,
                height: SIZES.height * 0.25,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  justifyContent: 'space-around',
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 1
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {verbal.levelOne}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 2
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {verbal.levelTwo}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>

              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 3
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {verbal.levelThree}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>
            </View>
            {/* written Test statistics */}
            <View
              style={{
                width: SIZES.width * 0.5,
                height: SIZES.height * 0.05,
                alignItems: 'center',
                marginTop: SIZES.height * 0.02,
              }}>
              <Text style={[styles.headingText, {color: 'black'}]}>
                Written Test Statistics
              </Text>
            </View>
            <View
              style={{
                width: SIZES.width,
                height: SIZES.height * 0.25,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  justifyContent: 'space-around',
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 1
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {written.levelOne}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 2
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {written.levelTwo}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>

              <View
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.height * 0.15,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                }}>
                <Text style={[styles.headingText, {color: 'black'}]}>
                  Level 3
                </Text>
                {check ? (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    {written.levelThree}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '300',
                      fontSize: SIZES.width * 0.1,
                    }}>
                    ?
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                width: SIZES.width * 0.5,
                height: SIZES.height * 0.05,
                alignItems: 'center',
                marginTop: SIZES.height * 0.02,
              }}>
              <Text style={[styles.headingText, {color: 'black'}]}>
                Overall Statistics
              </Text>
            </View>
          </View>

          {/* Chart Pie Test */}
          <View
            style={[
              styles.bodyContainer,
              {
                backgroundColor: COLORS.primarybg,
              },
            ]}>
            <View
              style={{
                width: '100%',
                height: '60%',
              }}>
              <Chart />
            </View>
            <View
              style={{
                width: '100%',
                height: '25%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: '2%',
                }}>
                <Text style={[styles.paragrapgh, {color: 'black'}]}>
                  Verbal Test
                </Text>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'tomato',
                  }}></View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: '2%',
                }}>
                <Text style={[styles.paragrapgh, {color: 'black'}]}>
                  Written Test
                </Text>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'orange',
                  }}></View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={[styles.paragrapgh, {color: 'black'}]}>
                  Assessment
                </Text>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'gold',
                  }}></View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default UserProfile;
