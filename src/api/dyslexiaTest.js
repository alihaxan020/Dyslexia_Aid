import client from './client';

export const getVerbalTest = async () => {
  try {
    const res = await client.get('/getverbaltest');
    if (res.data.success) {
      return res.data;
    } else {
      return res.data.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
