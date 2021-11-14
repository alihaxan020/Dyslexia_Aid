import {StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../../constants';
export default styles = StyleSheet.create({
  headerContainer: {
    width: SIZES.width,
    height: SIZES.height * 0.15,
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
    justifyContent: 'space-evenly',
  },
  headingText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: '700',
  },
});
