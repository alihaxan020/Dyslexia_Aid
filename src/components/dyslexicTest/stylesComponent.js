import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../../../constants';
export default stylesComponent = StyleSheet.create({
  headingText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    color: 'white',
  },
  levelText: {
    fontSize: SIZES.padding2,
    color: 'white',
    fontWeight: 'bold',
  },
  subHeading: {
    color: 'white',
    fontSize: 20,
  },
  optionsSection: {
    width: SIZES.width,
    height: SIZES.height * 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listenImage: {
    width: SIZES.width * 0.28,
    height: SIZES.width * 0.28,
    borderRadius: (SIZES.width * 0.28) / 2,
    borderWidth: 1,
    borderColor: 'black',
    resizeMode: 'cover',
  },

  nextButton: {
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.35,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
