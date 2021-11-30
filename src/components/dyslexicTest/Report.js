import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {images, SIZES} from '../../constants';
import {stylesComponent} from './stylesComponent';
const Report = () => {
  return (
    <View
      style={{
        width: SIZES.width,
        height: SIZES.height * 0.9,
        borderWidth: 4,
        borderColor: 'red',
      }}>
      <View
        style={{
          alignItems: 'center',
          height: SIZES.height * 0.8,
          justifyContent: 'space-evenly',
          borderWidth: 4,
          borderColor: 'yellow',
        }}>
        <View>
          <Image
            source={images.user}
            style={[
              styles.avator,
              {
                width: 60,
                height: 60,
                borderColor: null,
                right: 0,
              },
            ]}
            resizeMode="cover"
          />
          <Text>Level 2</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: SIZES.width,
            justifyContent: 'space-around',
            borderWidth: 4,
            borderColor: 'green',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.listenicon}
              style={[
                styles.avator,
                {width: 60, height: 60, borderColor: null, right: 0},
              ]}
              resizeMode="cover"
            />
            <Text>Diffculty</Text>
            <Text>Medium</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.logo}
              style={[
                styles.avator,
                {width: 60, height: 60, borderColor: null, right: 0},
              ]}
              resizeMode="cover"
            />
            <Text>Score</Text>
            <Text>2</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            borderWidth: 4,
            borderColor: 'yellow',
          }}>
          <Text>Remarks</Text>
          <Text>You have to correct 3 questions out of 4</Text>
          <Text>move to next level</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: SIZES.width,
            justifyContent: 'space-around',
            borderWidth: 4,
            borderColor: 'yellow',
          }}>
          <TouchableOpacity onPress={() => console.log('reset form')}>
            <Text>Reset Level</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Next Level')}>
            <Text>Next Level</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Report;
const height_logo = SIZES.height * 0.08;
const styles = StyleSheet.create({
  avator: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    right: 10,
  },
});
