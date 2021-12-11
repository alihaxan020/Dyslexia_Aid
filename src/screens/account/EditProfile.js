import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '../../components/common/BottomSheet';
import GradientView from '../../components/common/GradientView';
import {useLogin} from '../../context/LoginProvider';
import client from '../../api/client';
import profile from '../../../assets/images/user.png';
import {images, COLORS, icons} from '../../constants';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const profileUri = Image.resolveAssetSource(profile).uri;
import {Formik} from 'formik';
import * as yup from 'yup';
import ChangePassword from './ChangePassword';
const validationSchema = yup.object({
  name: yup.string().min(3, 'Too Short!').required('Name is equired!'),
  age: yup
    .string()
    .required('Age is required!')
    .test('is-num-5-100', 'Age must be between 5 and 100', value => {
      return parseInt(value) < 100 && parseInt(value) > 5;
    }),
  gender: yup.string().required('Gender must be between Male or Female.'),
});

const EditProfile = () => {
  const [localFile, setLocalFile] = useState(null);
  const {setUserInfo, userInfo} = useLogin();
  const [changePassword, setChangePassword] = useState(false);
  const profile = {
    name: userInfo.name,
    age: userInfo.age,
    gender: userInfo.gender,
  };
  useEffect(() => {}, [localFile, userInfo]);

  const sheetRef = useRef(null);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onFileSelected = async image => {
    closeSheet();
    setLocalFile(image);
    setUserInfo(prevState => ({
      ...prevState,
      avator: image.path,
    }));

    const formData = new FormData();
    const data = {
      name: new Date() + '_Profile',
      uri: image.path,
      type: image.mime,
    };

    formData.append('profile', data);

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token: ', token);
      let tokenProfile = `JWT ${token}`;
      const res = await client.post('/upload-profile', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: tokenProfile,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleChange = () => setChangePassword(false);
  return (
    <ImageBackground style={{flex: 1}} source={images.background}>
      {changePassword ? (
        <ChangePassword handleBack={handleChange} />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View>
              <Image
                source={{
                  uri:
                    localFile?.path ||
                    localFile ||
                    userInfo.avatar ||
                    profileUri,
                }}
                style={styles.imageStyle}
              />
            </View>
            <TouchableOpacity onPress={openSheet}>
              <Text style={{fontSize: 20, color: 'blue', fontWeight: 'bold'}}>
                Change photo
              </Text>
            </TouchableOpacity>
            <BottomSheet ref={sheetRef} onFileSelected={onFileSelected} />
          </View>
          <ScrollView>
            <GradientView
              colors={[COLORS.primary, COLORS.secondary, COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientContainer}>
              <Formik
                initialValues={profile}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  console.log(values);
                }}>
                {formikProps => (
                  <React.Fragment>
                    <View>
                      <View style={{alignItems: 'flex-end'}}>
                        {formikProps.touched.name && formikProps.errors.name ? (
                          <Text style={styles.errorText}>
                            {formikProps.errors.name}
                          </Text>
                        ) : null}
                      </View>

                      <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                          <Image
                            source={icons.nameIcon}
                            style={styles.iconStyle}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.inputTextContainer}>
                          <TextInput
                            value={formikProps.values.name}
                            onChangeText={formikProps.handleChange('name')}
                            style={styles.textStyle}
                            onBlur={formikProps.handleBlur('name')}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.iconContainer}>
                        <Image
                          source={icons.emailIcon}
                          style={styles.iconStyle}
                          resizeMode="contain"
                        />
                      </View>
                      <TouchableOpacity
                        style={[styles.inputTextContainer]}
                        onPress={() =>
                          Alert.alert(
                            'Dyslexia Aid',
                            'You can not change your email.',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                          )
                        }>
                        <Text style={styles.textStyle}>{userInfo.email}</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <View style={{alignItems: 'flex-end'}}>
                        {formikProps.touched.age && formikProps.errors.age ? (
                          <Text style={styles.errorText}>
                            {formikProps.errors.age}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                          <Image
                            source={icons.ageIcon}
                            style={[styles.iconStyle, {tintColor: 'black'}]}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.inputTextContainer}>
                          <TextInput
                            value={formikProps.values.age.toString()}
                            onChangeText={formikProps.handleChange('age')}
                            style={styles.textStyle}
                            onBlur={formikProps.handleBlur('age')}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={{alignItems: 'flex-end'}}>
                        {formikProps.touched.gender &&
                        formikProps.errors.gender ? (
                          <Text style={styles.errorText}>
                            {formikProps.errors.gender}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                          <Image
                            source={icons.genderIcon}
                            style={styles.iconStyle}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.inputTextContainer}>
                          <TextInput
                            value={formikProps.values.gender}
                            onChangeText={formikProps.handleChange('gender')}
                            style={styles.textStyle}
                            onBlur={formikProps.handleBlur('gender')}
                          />
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: width * 0.4,
                        height: height * 0.05,
                        backgroundColor: COLORS.success,
                        borderRadius: 20,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={formikProps.handleSubmit}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Update Profile
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                )}
              </Formik>
              <>
                <TouchableOpacity
                  onPress={() => setChangePassword(true)}
                  style={{
                    width: width * 0.6,
                    height: height * 0.05,
                    backgroundColor: COLORS.success,
                    borderRadius: 20,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                    Change Password
                  </Text>
                  <FontAwesome5 name="user-lock" size={30} />
                </TouchableOpacity>
              </>
            </GradientView>
          </ScrollView>
        </>
      )}
    </ImageBackground>
  );
};

export default EditProfile;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.3,
    height: width * 0.3,
    overflow: 'hidden',
    borderRadius: (width * 0.3) / 2,
  },
  inputContainer: {
    width: width * 0.9,
    height: height * 0.05,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 35,
    height: 35,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: '85%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {fontSize: 25, fontWeight: '600', color: 'black', flex: 1},
  gradientContainer: {
    width: width,
    height: height * 0.628,
    borderWidth: 1,
    borderColor: 'yellow',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width,
    height: height * 0.25,
    marginBottom: height * 0.05,
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
