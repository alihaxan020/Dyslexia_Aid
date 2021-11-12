import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '../../../components/common/BottomSheet';
import {useLogin} from '../../../context/LoginProvider';
import client from '../../../api/client';
import profile from '../../../../assets/images/user.png';
import {useEffect} from 'react';
const profileUri = Image.resolveAssetSource(profile).uri;
const DyslexicForm = () => {
  const [localFile, setLocalFile] = useState(null);
  const {setUserInfo, userInfo} = useLogin();

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
    console.log(image);
    formData.append('profile', {
      name: new Date() + '_Profile',
      uri: image,
      type: image.mime,
    });
    console.log(userInfo.token);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const res = await client.post(
        '/upload-profile',
        JSON.stringify(formData),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${token}`,
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>DyslexicForm </Text>
      <View>
        <Image
          source={{
            uri: localFile?.path || localFile || userInfo.avator || profileUri,
          }}
          style={styles.imageStyle}
        />
      </View>
      <TouchableOpacity onPress={openSheet}>
        <Text style={{fontSize: 20, color: 'blue'}}>Change photo</Text>
      </TouchableOpacity>
      <BottomSheet ref={sheetRef} onFileSelected={onFileSelected} />
    </View>
  );
};

export default DyslexicForm;

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
});
