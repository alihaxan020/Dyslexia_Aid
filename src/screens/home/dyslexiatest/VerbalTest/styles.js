import {StyleSheet} from 'react-native';
import {SIZES, FONTS} from '../../../../constants';
export default styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  headingText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    color: 'white',
  },
  levelText: {
    fontSize: SIZES.padding,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: SIZES.base,
  },
});
