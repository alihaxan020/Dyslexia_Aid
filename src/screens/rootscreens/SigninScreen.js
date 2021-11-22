import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images, COLORS, SIZES, FONTS, icons} from '../../constants';
import FormInput from '../../components/common/FormInput';
import {useLogin} from '../../context/LoginProvider';
import {signIn} from '../../api/user';
import {Formik} from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is Required!'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password should be 8 chars minimum.'),
});
const SigninScreen = ({navigation}) => {
  const [secure, setSecure] = useState(false);
  const [error, setError] = useState('');
  const {setIsLoggedIn, setUserInfo, setLoginPending} = useLogin();
  // let isRendered = useRef(false);
  // useEffect(() => {
  //   const secureState = setError(false);
  //   const errorState = setError('');
  //   return () => {
  //     secureState, errorState;
  //   };
  // // }, [secure, error]);
  // useEffect(() => {
  //   isRendered = true;
  //   return () => {
  //     isRendered = false;
  //   };
  // }, []);

  const handleSecure = () => {
    setSecure(!secure);
  };
  const onSubmit = async (values, actions) => {
    setLoginPending(true);

    try {
      const res = await signIn(values.email, values.password);
      if (res.data.success) {
        setIsLoggedIn(true);
        setTimeout(() => setLoginPending(false), 2000);
        setUserInfo(res.data.user);
      }
    } catch (error) {
      setLoginPending(false);
      console.log(error.message);
      setError('Invalid Email or Password, try again');
      actions.resetForm();
    }

    setTimeout(() => {
      actions.setSubmitting(false);
      setError('');
      actions.resetForm();
    }, 2000);
  };

  return (
    <ImageBackground
      source={images.background}
      style={styles.background}
      resizeMode="stretch">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <View style={styles.userIcon}>
            <Image
              source={images.user}
              style={{
                width: SIZES.width * 0.24,
                height: SIZES.width * 0.24,
                borderRadius: (SIZES.width * 0.24) / 2,
                resizeMode: 'cover',
              }}
            />
          </View>
        </View>
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
                <FormInput
                  placeholder="Enter your password"
                  icon={icons.passwordIcon}
                  autoCapitalize="none"
                  secureEntry="yes"
                  autoCorrect={false}
                  secureTextEntry={secure ? false : true}
                  handleSecure={handleSecure}
                  formikKey="password"
                  formikProps={formikProps}
                />
              </View>
              <View style={styles.forgetPassword}>
                <TouchableOpacity
                  onPress={() => console.log('Forget password')}>
                  <Text
                    style={{
                      ...FONTS.h2,
                      color: COLORS.secondary,
                      fontWeight: 'bold',
                    }}>
                    Forget password?
                  </Text>
                </TouchableOpacity>
              </View>
              {error ? (
                <View style={styles.errorContainer}>
                  <View style={styles.errorText}>
                    <Text
                      style={{fontSize: 16, color: 'red', fontWeight: '400'}}>
                      {error}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: error ? 10 : SIZES.padding2,
                }}>
                <TouchableOpacity onPress={() => formikProps.handleSubmit()}>
                  <LinearGradient
                    colors={[
                      COLORS.primary,
                      COLORS.secondary,
                      COLORS.secondary,
                    ]}
                    style={styles.buttonStyle}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          ...FONTS.h1,
                          fontWeight: 'bold',
                          color: COLORS.white,
                        }}>
                        Log in
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignupScreen')}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondarybg]}
                    style={[styles.buttonStyle, {marginTop: SIZES.radius}]}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}>
                    <Text
                      style={{
                        ...FONTS.h1,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      Sign up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.5,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
  },

  forgetPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },

  userIcon: {
    marginTop: SIZES.height * 0.2,
    marginBottom: 30,
    borderWidth: 2,
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
    borderRadius: (SIZES.width * 0.25) / 2,
    alignItems: 'center',
    elevation: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
