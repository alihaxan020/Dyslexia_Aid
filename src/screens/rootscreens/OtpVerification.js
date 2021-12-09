import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {images} from '../../constants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AppLoader from '../../components/common/AppLoader';
import FormInput from '../../components/common/FormInput';
import {icons, FONTS, COLORS} from '../../constants';
import {updatePassword} from '../../api/user';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
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

const CELL_COUNT = 4;
const OtpVerification = ({route, navigation}) => {
  const {otp, token} = route.params;
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureCP, setSecureCP] = useState(true);
  const [message, setMessage] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const compareOTP = () => {
    setLoader(true);
    if (value === otp) {
      setTimeout(() => {
        setError('');
        setLoader(false);
        setCheck(true);
      }, 4000);
      setError('Successfully');
    }
    if (value !== otp) {
      setTimeout(() => {
        setError('');
        setLoader(false);
        goBack();
      }, 4000);
      setError('Invalid OTP');
    }
  };
  const goBack = () => navigation.navigate('ForgetPassword');
  const handleSecure = () => {
    setSecure(!secure);
  };
  const handleSecureCP = () => {
    setSecureCP(!secureCP);
  };
  const onSubmit = async (values, actions) => {
    setLoader(true);
    try {
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
      {check ? (
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
      ) : null}
      {loader ? <AppLoader /> : null}
      {check ? (
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
                    placeholder="Enter your password"
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
                    placeholder="Enter confirm password"
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
            </View>
          )}
        </Formik>
      ) : (
        <View style={styles.container}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image source={images.verifyIcon} style={styles.image} />
          </View>
          <Text style={[styles.title, {fontWeight: 'bold'}]}>
            Verification OTP
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Text style={styles.title}>{message}</Text>
          {value.length == 4 ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.verify}
                onPress={() => compareOTP()}>
                {loader ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={[styles.title, {color: 'white'}]}>Verify</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
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
export default OtpVerification;
