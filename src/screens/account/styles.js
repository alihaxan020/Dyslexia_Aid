import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants';
export default styles = StyleSheet.create({
  bodyContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.66,
  },
  headerContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.35,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.padding2,
    fontWeight: 'bold',
    color: 'white',
  },
  headingText: {
    fontSize: SIZES.padding,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeading: {
    color: 'white',
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  paragrapgh: {
    fontSize: SIZES.h3,
    color: 'white',
    fontWeight: 'bold',
  },
  imageStyle: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: SIZES.width * 0.15,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  imageContainer: {
    marginTop: SIZES.height * 0.05,
    width: SIZES.width * 0.32,
    height: SIZES.width * 0.32,
    borderRadius: SIZES.width * 0.16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: SIZES.width * 0.09,
    height: SIZES.width * 0.09,
    borderRadius: (SIZES.width * 0.09) / 2,
    overflow: 'hidden',
    tintColor: 'white',
  },
  fieldStyle: {
    // backgroundColor: 'white',
    borderRadius: 30,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: 'white',
  },
  userInfoContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.45,
  },
});
