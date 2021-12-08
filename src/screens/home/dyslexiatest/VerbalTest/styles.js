import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../../../constants';
export default styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructionContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.18,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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
  optionText: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  questionCount: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    resizeMode: 'cover',
  },
  speechSettings: {
    width: SIZES.width * 0.13,
    height: SIZES.width * 0.13,
    borderRadius: (SIZES.width * 0.13) / 2,
    resizeMode: 'cover',
  },
  optionContainer: {
    height: SIZES.height * 0.4,
    width: SIZES.width,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  optionView: {
    height: SIZES.height * 0.07,
    width: SIZES.width * 0.65,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.05,
    backgroundColor: COLORS.primarybg,
  },
  nextButton: {
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.35,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    height: SIZES.height * 0.1,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: '#0000',
  },
  paragrapgh: {
    fontSize: SIZES.h3,
    color: 'white',
    fontWeight: 'bold',
  },
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    marginTop: 10,
  },
  textContainer: {width: '100%', alignItems: 'center'},
  resultText: {
    width: '70%',
    backgroundColor: COLORS.primarybg,
    height: '15%',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
