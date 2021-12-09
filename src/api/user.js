import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';
export const signIn = async (email, password) => {
  try {
    const signInRes = await client.post('/sign-in', {email, password});

    if (signInRes.data.success) {
      const token = signInRes.data.token;
      await AsyncStorage.setItem('token', token);
      return signInRes;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      const res = await client.get('/sign-out', {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.removeItem('token');
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log('Error in signout method', error.message);
    return false;
  }
};

export const postUsersScroes = async test => {
  try {
    const tokenProfile = await AsyncStorage.getItem('token');
    const usersScoresRes = await client.post(
      '/postuserscores',
      {test},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `JWT ${tokenProfile}`,
        },
      },
    );
    if (usersScoresRes.data.success) {
      return usersScoresRes.data;
    } else {
      return 'Some Internal Server Error';
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const forgetPassword = async email => {
  try {
    const forgetRes = await client.post('/forget-password', {email});
    if (forgetRes.data.success) {
      return forgetRes.data;
    } else {
      return forgetRes.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePassword = async (token, newPassword) => {
  try {
    const updatePasswordRes = await client.post(
      '/updatepassword',
      {newPassword},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `JWT ${token}`,
        },
      },
    );
    if (updatePasswordRes.data.success) {
      return updatePasswordRes.data;
    } else {
      return updatePasswordRes.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
