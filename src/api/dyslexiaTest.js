import client from './client';

export const getVerbalTest = async data => {
  console.log(data);
  try {
    const res = await client.post('/getverbaltest', data);
    if (res.data.success) {
      return res.data;
    } else {
      return res.data.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getWrittenTest = async data => {
  console.log(data);
  try {
    const res = await client.post('/getwrittentest', data);
    if (res.data.success) {
      return res.data;
    } else {
      return res.data.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
