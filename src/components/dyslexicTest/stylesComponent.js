import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants';
export default stylesComponent = StyleSheet.create({
  reportContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.9,
  },
  reportBody: {
    alignItems: 'center',
    height: SIZES.height * 0.9,
    justifyContent: 'space-evenly',
  },
  reportLevel: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width,
    height: SIZES.height * 0.1,
  },
  scoreContainer: {
    flexDirection: 'row',
    width: SIZES.width,
    justifyContent: 'space-around',
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
  listenImage: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
    borderRadius: (SIZES.width * 0.2) / 2,
    resizeMode: 'cover',
  },

  nextButton: {
    height: SIZES.height * 0.065,
    width: SIZES.width * 0.35,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: SIZES.width,
    justifyContent: 'space-around',
  },
});
