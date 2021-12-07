import React from 'react';
import {Text, View, ScrollView, Image, ImageBackground} from 'react-native';

import Chart from '../../components/dyslexicTest/Chart';
import styles from './styles';
import {images, COLORS} from '../../constants';
import {useLogin} from '../../context/LoginProvider';
import GradientView from '../../components/common/GradientView';
const UserProfile = () => {
  const {setUserInfo, userInfo} = useLogin();
  return (
    <ImageBackground style={{flex: 1}} source={images.background}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: userInfo.avatar || images.user,
            }}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.headingText}>{userInfo.name}</Text>
      </View>
      <View>
        <ScrollView
          style={{
            marginBottom: '50%',
          }}>
          <GradientView
            colors={[COLORS.primary, COLORS.secondary]}
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}
            style={[
              styles.bodyContainer,
              {
                backgroundColor: COLORS.primarybg,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              },
            ]}></GradientView>
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
