import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import FormInput from '../../components/common/FormInput';
import {icons, FONTS, COLORS} from '../../constants';
import AppLoader from '../../components/common/AppLoader';
import {Formik} from 'formik';
import {forgetPassword} from '../../api/user';
import * as Yup from 'yup';
const ForgetPassword = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const initialValues = {
    email: '',
  };
  const onSubmit = async (values, actions) => {
    console.log(values.email);
    setLoader(true);
    try {
      const res = await forgetPassword(values.email);
      if (res.success === true) {
        navigation.navigate('OtpVerification', {
          otp: res.otp.otp,
          token: res.otp.token,
        });
        setTimeout(() => {
          setLoader(false);
        }, 2000);
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

    setTimeout(() => {
      actions.setSubmitting(false);
      setError('');
      actions.resetForm();
    }, 2000);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is Required!'),
  });
  useEffect(() => {
    return () => {
      setError('');
    };
  }, []);

  return (
    <View style={styles.root}>
      {loader ? <AppLoader /> : null}
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
      <View style={{height: height * 0.4, justifyContent: 'space-evenly'}}>
        <Text style={styles.title}>Enter your account email</Text>
        <Text style={[styles.title, {fontWeight: 'bold'}]}>To receive OTP</Text>
        {error ? (
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'red',
              textAlign: 'center',
            }}>
            {error}
          </Text>
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {formikProps => (
            <React.Fragment>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <FormInput
                  placeholder="Enter your email"
                  icon={icons.emailIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 20}}
                  formikKey="email"
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
                        Email Verification
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </View>
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
export default ForgetPassword;
