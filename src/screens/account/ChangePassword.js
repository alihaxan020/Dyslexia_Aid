import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../../components/common/AppLoader';
import FormInput from '../../components/common/FormInput';
import {icons, FONTS, COLORS} from '../../constants';
import {updatePassword} from '../../api/user';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const initialValues = {
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required!')
    .equals([Yup.ref('password'), null], 'Password does not match!'),
});

const ChangePassword = props => {
  const [loader, setLoader] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureCP, setSecureCP] = useState(true);
  const [message, setMessage] = useState('');
  const handleSecure = () => {
    setSecure(!secure);
  };
  const handleSecureCP = () => {
    setSecureCP(!secureCP);
  };
  const onSubmit = async (values, actions) => {
    setLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await updatePassword(token, values.password);
      if (res.success === true) {
        setMessage(res.message);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
        navigation.navigate('SigninScreen');
      }
      if (res.success === false) {
        setError(res.message);
        setTimeout(() => {
          setError(res.message);
        }, 2000);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
      actions.resetForm();
    }
  };
  useEffect(() => {
    return () => {
      setMessage('');
    };
  }, []);
  return (
    <View style={styles.root}>
      <View
        style={{
          width: width * 0.4,
          height: height * 0.2,
        }}>
        <LottieView
          source={require('../../../assets/lotties/resetPassword.json')}
          autoPlay
          loop
        />
      </View>
      {loader ? <AppLoader /> : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {formikProps => (
          <View
            style={{
              height: height * 0.4,
              justifyContent: 'space-evenly',
            }}>
            <React.Fragment>
              {message ? (
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  {message}
                </Text>
              ) : null}
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <FormInput
                  placeholder="Enter new password"
                  icon={icons.passwordIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 10}}
                  secureEntry="yes"
                  secureTextEntry={secure ? true : false}
                  handleSecure={handleSecure}
                  formikKey="password"
                  formikProps={formikProps}
                />
                <FormInput
                  placeholder="Enter new confirm password"
                  icon={icons.passwordIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 10}}
                  secureEntry="yes"
                  secureTextEntry={secureCP ? true : false}
                  handleSecure={handleSecureCP}
                  formikKey="confirmPassword"
                  formikProps={formikProps}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => formikProps.handleSubmit()}>
                  <View style={[styles.verify, {alignItems: 'center'}]}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          ...FONTS.h2,
                          fontWeight: 'bold',
                          color: COLORS.white,
                        }}>
                        Submit
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </React.Fragment>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => props.handleBack()}>
                <View
                  style={[
                    styles.verify,
                    {
                      alignItems: 'center',
                      backgroundColor: COLORS.error,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    },
                  ]}>
                  <FontAwesome5 name="arrow-left" size={30} />

                  <Text
                    style={{
                      ...FONTS.h2,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }}>
                    Go Back
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
    flexDirection: 'column',
    paddingTop: height * 0.1,
    alignItems: 'center',
  },
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  container: {
    width: width * 0.8,
    height: height * 0.4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    aligmSize: 'center',
  },
  verify: {
    width: width * 0.6,
    height: height * 0.05,
    backgroundColor: 'blue',
    borderRadius: 20,
    shadowOpacity: 0,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    overflow: 'hidden',
  },

  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ChangePassword;
