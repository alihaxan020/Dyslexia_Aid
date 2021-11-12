import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loginPending, setLoginPending] = useState(false);
  const fetchUser = async () => {
    setLoginPending(true);
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      const res = await client.get('/profile/', {
        headers: {Authorization: `JWT ${token}`},
      });
      if (res.data.success) {
        setUserInfo(res.data.profile);
        setIsLoggedIn(true);
      } else {
        setUserInfo({});
        setIsLoggedIn(false);
      }
      setLoginPending(false);
    } else {
      setUserInfo({});
      setIsLoggedIn(false);
      setLoginPending(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        loginPending,
        setLoginPending,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
