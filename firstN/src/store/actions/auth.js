import AsyncStorage from '@react-native-community/async-storage';

import { API_KEY , STORAGE_KEYS } from "../../config";
import { uiStartLoading, uiStopLoading } from "./index";
import { goHome } from "../../navigation/navigation";
import { AUTH_SET_TOKEN } from './actionTypes';

export const tryAuth = (authData, authMode) => async dispatch => {
  const body = {
    email:              authData.email,
    password:           authData.password,
    returnSecureToken:  true
  };
  const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  const url = authMode === 'login' ? 
    `${baseUrl}signInWithPassword?key=${API_KEY}` :
    `${baseUrl}signUp?key=${API_KEY}`;
  
  dispatch(uiStartLoading());

    try {
      const res = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const parsedRes = await res.json();
      if (parsedRes.error) {
        throw parsedRes.error;
      } else if (!parsedRes.idToken) {
        throw 'Token is missed'
      }

      console.log('Auth response:', parsedRes);
      
      dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
      dispatch(uiStopLoading());
      goHome();
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
      alert("Authentication failed, please try again");
    }
};


export const authStoreToken = (token, expiresIn) => async dispatch => {
  dispatch(authSetToken(token));
  try {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    await AsyncStorage.setItem(STORAGE_KEYS.token, token);
    await AsyncStorage.setItem(STORAGE_KEYS.expiryDate, expiryDate.toString())
  } catch (error) {
    console.log('Error while storing data to storage', error);
  }
};


export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});


export const authGetToken = () => async (dispatch, getState) => {
  let token = getState().auth.token;
  let expiryDate = null;

  try {
    expiryDate = await AsyncStorage.getItem(STORAGE_KEYS.expiryDate);
    if(!token) {
      token = await AsyncStorage.getItem(STORAGE_KEYS.token);
    }
  } catch (error) {
    console.log(error);
  }
  
  return new Promise((resolve, reject) => {
    if (token) {
      if (!expiryDate) { reject('Expiry date lost'); }

      const parsedExpiryDate = new Date(+expiryDate);
      const now = new Date();

      if (parsedExpiryDate <= now) {
        reject('Expiry date is over');
      } else {
        dispatch(authSetToken(token));
        resolve(token);
      }
    } else {
      reject('Error while getting token')
    }
  });
};

export const authAutoSignIn = () => async dispatch => {
  try {
    await dispatch(authGetToken());
    goHome();
  } catch (error) {
    console.log('Failed to fetch token');
  }
};

