import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES, COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FormInput = props => {
  //const {icon, secureEntry, handleSecure, errorMessage} = props;

  const {formikProps, formikKey, icon, secureEntry, handleSecure} = props;
  return (
    <>
      <View style={styles.errorContainer}>
        <View style={styles.errorText}>
          {formikProps.touched[formikKey] && formikProps.errors[formikKey] ? (
            <Text style={{fontSize: 16, color: 'red', fontWeight: '400'}}>
              {formikProps.errors[formikKey]}
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          formikProps.touched[formikKey] && formikProps.errors[formikKey]
            ? null
            : props.style,
        ]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, COLORS.secondary]}
          style={styles.inputIcon}>
          <Image
            source={icon}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
            }}
            resizeMode="contain"
          />
        </LinearGradient>
        <TextInput
          {...props}
          value={formikProps.values[formikKey]}
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
        />
        {secureEntry ? (
          <TouchableOpacity onPress={handleSecure}>
            <Ionicons
              size={30}
              name={props.secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.07,
    backgroundColor: COLORS.primarybg,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
  },
  inputIcon: {
    width: SIZES.width * 0.11,
    height: SIZES.width * 0.11,
    borderRadius: (SIZES.width * 0.11) / 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    flex: 1,
    marginLeft: SIZES.base,
    fontSize: SIZES.body3,
    fontWeight: '600',
  },
  userIcon: {
    marginTop: SIZES.height * 0.2,
    borderWidth: 2,
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
    borderRadius: (SIZES.width * 0.25) / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primarybg,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '85%',
  },
  errorText: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
