import AsyncStorage from '@react-native-community/async-storage';

import { API_KEY , STORAGE_KEYS } from "../../config";
import { uiStartLoading, uiStopLoading } from "./index";
import { goHome } from "../../navigation/navigation";
import { AUTH_SET_TOKEN } from './actionTypes';

const sendAuthRequest = async (authData, authMode) => {
  const body = {
    email:              authData.email,
    password:           authData.password,
    returnSecureToken:  true
  };
  const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  const url = authMode === 'login' ? 
    `${baseUrl}signInWithPassword?key=${API_KEY}` :
    `${baseUrl}signUp?key=${API_KEY}`;
  
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
      throw 'Token is missed';
    }
          
    return parsedRes;
  } catch (error) {
    throw error;
  }
};

const validateToken = (token, expiryDate) => {
  if (token) {
    if (!expiryDate) { return { error: 'Expiry date lost' }; }

    const parsedExpiryDate = new Date(+expiryDate);
    const now = new Date();

    if (parsedExpiryDate <= now) {
      return { error: 'Expiry date is over'};
    } else {
      return { error: false }
    }
  } else {
    return { error: 'Error while getting token' };
  }
};

const exchangeRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.refreshToken);
    const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=refresh_token&refresh_token=" + refreshToken
    });

    const parsedRes = await res.json();
    console.log('Refresh token parsed response', parsedRes);
    if (parsedRes.id_token) {
      return parsedRes;
    } else {
      throw 'ID token is missed'
    }
  
  } catch (error) {
    throw error;
  }
};


export const tryAuth = (authData, authMode) => async dispatch => {
  dispatch(uiStartLoading());

  try {
    const parsedRes = await sendAuthRequest(authData, authMode);
    console.log('Auth response:', parsedRes);
    
    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
    dispatch(uiStopLoading());
    goHome();
  } catch (error) {
    dispatch(uiStopLoading());
    console.log(error);
    alert("Authentication failed, please try again");
  }
};


export const authStoreToken = (token, expiresIn, refreshToken) => async dispatch => {
  dispatch(authSetToken(token));
  try {
    const now = new Date();
    //! const expiryDate = now.getTime() + expiresIn * 1000;
    const expiryDate = now.getTime() + 5 * 1000;

    await AsyncStorage.setItem(STORAGE_KEYS.token, token);
    await AsyncStorage.setItem(STORAGE_KEYS.expiryDate, expiryDate.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  } catch (error) {
    console.log('Error while storing data to storage', error);
  }
};


export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});


export const authGetToken = () => async (dispatch, getState) => {
  let token      = getState().auth.token;
  let expiryDate = null;

  try {
    expiryDate = await AsyncStorage.getItem(STORAGE_KEYS.expiryDate);
    if(!token) {
      token = await AsyncStorage.getItem(STORAGE_KEYS.token);
    }
  } catch (error) {
    console.log('Error while getting data from storage', error);
  }

  const promise = new Promise((resolve, reject) => {
    const { error } = validateToken(token, expiryDate);
    if (!error) {
      dispatch(authSetToken(token));
      resolve(token);
    } else {
      console.log(error);
      reject('Error while getting token', error);
    }
  });

  return promise
    .catch(async err => {
      try {
        const { id_token, expires_in, refresh_token } = await exchangeRefreshToken();
        dispatch(authStoreToken(id_token, expires_in, refresh_token));
        return id_token;
      } catch (error) {
        console.log(error)      
        dispatch(authClearStorage());
        throw error;
      }
    }).then(token => {
      if (!token) { 
        throw new Error()
      } else {
        return token;
      }
    });
};

export const authAutoSignIn = () => async dispatch => {
  try {
    await dispatch(authGetToken());
    goHome();
  } catch (error) {
    console.log('Failed to fetch token', error);
  }
};

export const authClearStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.token);
    await AsyncStorage.removeItem(STORAGE_KEYS.expiryDate);
  } catch (error) {
    console.log(error);
  }
};

