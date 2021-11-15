import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, icons, SIZES, FONTS} from '../../constants';
import {useLogin} from '../../context/LoginProvider';
const HeaderTest = ({headerText, BackScreen}) => {
  const {userInfo} = useLogin();
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary, COLORS.secondary]}
      style={styles.headerContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => BackScreen()}>
          <Image source={icons.turnLeft} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headingText}>{headerText}</Text>
        <Image
          source={{uri: userInfo.avator}}
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'white',
            borderRadius: 50 / 2,
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: 'black',
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default HeaderTest;

const styles = StyleSheet.create({
  headerContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: 'white',
    borderLeftColor: COLORS.secondary,
    borderRightColor: COLORS.secondary,
    elevation: 0.5,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  headerView: {
    paddingTop: SIZES.body1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.radius,
  },
  headingText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: '700',
  },
  headerImage: {
    width: 35,
    height: 35,
    tintColor: 'white',
  },
});
