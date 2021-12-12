import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../../constants';
import HeaderTest from '../../../components/common/HeaderTest';
import {
  Transitioning,
  Transition,
  combineTransition,
  FadeInUp,
  FadeOutLeft,
} from 'react-native-reanimated';
import BackgroundImageApp from '../../../components/common/BackgroundImageApp';
const ImproveListening = ({navigation}) => {
  const BackScreen = navigation.goBack;
  const [refreshed, setRefreshed] = useState(0);
  const ref = useRef();

  useEffect(() => {}, []);
  const animate = () => {
    console.log('first time');
    ref.current.animateNextTransition();
  };
  const transition = (
    <Transition.Sequence>
      <Transition.In
        type="slide-top"
        durationMs={2000}
        interpolation="easeIn"
      />
      <Transition.In type="slide-top" durationMs={1000} />
      <Transition.Change />
      <Transition.Out type="slide-top" durationMs={3000} />
    </Transition.Sequence>
  );
  const array = [
    {
      key: '1',
      title: 'example title 1',
      subtitle: 'example subtitle 1',
    },
    {
      key: '2',
      title: 'example title 2',
      subtitle: 'example subtitle 2',
    },
    {
      key: '3',
      title: 'example title 3',
      subtitle: 'example subtitle 3',
    },
  ];
  return (
    <BackgroundImageApp>
      <HeaderTest headerText="Improve Listening" BackScreen={BackScreen} />
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'red',
        }}>
        <Text style={styles.titleText}>Tap on any word to listen</Text>
        <Text style={styles.titleText}>the word written on it</Text>
      </View>
      <View style={{flex: 1, borderWidth: 1, borderColor: 'red'}}></View>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'red',
        }}>
        <TouchableOpacity>
          <Text style={styles.titleText}>Tap on any word to listen</Text>
        </TouchableOpacity>
      </View>
    </BackgroundImageApp>
  );
};

export default ImproveListening;

const styles = StyleSheet.create({
  bodyContainer: {
    height: SIZES.height * 0.78,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.padding2 * 1.5,
    borderTopRightRadius: SIZES.padding2 * 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    height: '25%',
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 24,
    shadowColor: 'black',
    shadowRadius: 16.0,
    borderRadius: 10,
  },
  viewChildOne: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildTwo: {
    height: '100%',
    width: '55%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageStyle: {width: '80%', height: '70%', resizeMode: 'cover'},
  titleText: {
    fontSize: SIZES.padding,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    color: 'blue',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '20%',
    backgroundColor: 'green',
    borderRadius: 30,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    flexDirection: 'column',
  },
});
