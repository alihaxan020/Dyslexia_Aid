import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../../constants';
export default stylesForm = StyleSheet.create({
  formcontainer: {
    width: SIZES.width,
    height: SIZES.height * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionContainer: {
    marginTop: 10,
    height: '25%',
    width: '98%',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  optionContainer: {
    height: '40%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'red',
  },
  listenImage: {
    width: SIZES.width * 0.13,
    height: SIZES.width * 0.13,
    resizeMode: 'cover',
  },
  optionView: {
    height: SIZES.height * 0.07,
    width: SIZES.width * 0.65,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.05,
    backgroundColor: COLORS.primarybg,
  },
  optionInstructions: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.35,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userScroll: {
    borderWidth: 2,
    borderColor: 'black',
    width: '95%',
    height: '50%',
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
});
