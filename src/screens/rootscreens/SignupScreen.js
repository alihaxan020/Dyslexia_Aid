import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {images, FONTS, icons, SIZES, COLORS} from '../../../src/constants';
import FormInput from '../../components/common/FormInput';
import LinearGradient from 'react-native-linear-gradient';
import client from '../../api/client';
import {useLogin} from '../../context/LoginProvider';
import {Formik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().min(3, 'Too Short!').required('Name is equired!'),
  age: yup.number().required('Age is required!').positive().integer(),
  gender: yup.string().required('Please select gender!'),
  email: yup.string().email('Invalid email!').required('Email is required!'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required!')
    .equals([yup.ref('password'), null], 'Password does not match!'),
});

const SignupScreen = ({navigation}) => {
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [secure, setSecure] = useState(true);
  const [secureCP, setSecureCP] = useState(true);
  const [error, setError] = useState('');
  const {setLoginPending} = useLogin();

  const handleSecure = () => {
    setSecure(!secure);
  };
  const handleSecureCP = () => {
    setSecureCP(!secureCP);
  };
  const onSubmit = async (values, actions) => {
    try {
      setLoginPending(true);
      const res = await client.post('/create-user', {...values});
      if (res.data.success) {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
        setError(res.data.message);
        setTimeout(() => {
          setError('');
        }, 2000);
        setLoginPending(false);
      } else {
        setLoginPending(false);
        setError(res.data.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <ImageBackground source={images.background} style={styles.background}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text
            style={{...FONTS.body1, color: COLORS.primary, fontWeight: 'bold'}}>
            Register Now!
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {formikProps => (
            <React.Fragment>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <FormInput
                  placeholder="Enter your name"
                  icon={icons.nameIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 10}}
                  formikKey="name"
                  formikProps={formikProps}
                />
                <FormInput
                  placeholder="Enter your age"
                  icon={icons.ageIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 10}}
                  formikKey="age"
                  formikProps={formikProps}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '85%',
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                    }}>
                    {formikProps.touched.gender && formikProps.errors.gender ? (
                      <Text
                        style={{fontSize: 16, color: 'red', fontWeight: '400'}}>
                        {formikProps.errors.gender}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    {marginTop: 5},
                    formikProps.touched.gender && formikProps.errors.gender
                      ? {marginBottom: 0}
                      : {marginBottom: 20},
                  ]}>
                  <LinearGradient
                    colors={[
                      COLORS.primary,
                      COLORS.secondary,
                      COLORS.secondary,
                    ]}
                    style={styles.inputIcon}>
                    <Image
                      source={icons.genderIcon}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: 'white',
                      }}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                  <Picker
                    selectedValue={formikProps.values.gender}
                    onValueChange={(...args) =>
                      formikProps.handleChange('gender')(String(args[0]))
                    }
                    style={{flex: 1}}
                    placeholder="Select gender"
                    mode="dialog">
                    <Picker.Item
                      label="Select gender"
                      value="0"
                      style={styles.textInput}
                      key={'empty'}
                    />
                    <Picker.Item
                      label="Male"
                      value="Male"
                      style={styles.textInput}
                      key={'Male'}
                    />
                    <Picker.Item
                      label="Female"
                      value="Female"
                      style={styles.textInput}
                      key={'Female'}
                    />
                  </Picker>
                </View>
                <FormInput
                  placeholder="Enter your email"
                  icon={icons.emailIcon}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{marginBottom: 10, marginTop: -15}}
                  formikKey="email"
                  formikProps={formikProps}
                />
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
                }}>
                <TouchableOpacity onPress={() => formikProps.handleSubmit()}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={[styles.buttonStyle, {marginTop: SIZES.radius}]}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          ...FONTS.h2,
                          fontWeight: 'bold',
                          color: COLORS.white,
                        }}>
                        Sign up
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SigninScreen')}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondarybg]}
                    style={[
                      styles.buttonStyle,
                      {marginTop: SIZES.radius, width: SIZES.width * 0.9},
                    ]}
                    start={{x: 1, y: 1}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        ...FONTS.h2,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      Already have an account? Log in
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

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: SIZES.height * 0.15,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.07,
    backgroundColor: COLORS.primarybg,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: SIZES.base,
    fontSize: SIZES.body3,
    fontWeight: '600',
  },
  inputIcon: {
    width: SIZES.width * 0.11,
    height: SIZES.width * 0.11,
    borderRadius: (SIZES.width * 0.11) / 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.45,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
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
