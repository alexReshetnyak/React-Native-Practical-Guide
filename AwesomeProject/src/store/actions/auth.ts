import AsyncStorage from '@react-native-community/async-storage';

import {goHome, goToAuth} from '../../navigation/navigation';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {authSetToken} from '../reducers/auth';
import {startLoading, stopLoading} from '../reducers/ui';

const sendAuthRequest = async (authData: any, authMode: string) => {
  const body = {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true,
  };
  const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  const url =
    authMode === 'login'
      ? `${baseUrl}signInWithPassword?key=test`
      : `${baseUrl}signUp?key=test`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

const validateToken = (token: string, expiryDate: number) => {
  if (token) {
    if (!expiryDate) {
      return {error: 'Expiry date lost'};
    }

    const parsedExpiryDate = new Date(+expiryDate);
    const now = new Date();

    if (parsedExpiryDate <= now) {
      return {error: 'Expiry date is over'};
    } else {
      return {error: false};
    }
  } else {
    return {error: 'Error while getting token'};
  }
};

const exchangeRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw 'exchangeRefreshToken: Refresh token not stored';
    }

    const res = await fetch(
      'https://securetoken.googleapis.com/v1/token?key=test',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
      },
    );

    const parsedRes = await res.json();
    // console.log('Refresh token parsed response', parsedRes);
    if (parsedRes.id_token) {
      return parsedRes;
    } else {
      throw 'ID token is missed';
    }
  } catch (error) {
    throw error;
  }
};

const clearStorage = () => async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expiryDate');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.log(error);
  }
};

const getTokenFromStorage = async (auth: RootState['auth']) => {
  let token = auth.token;
  let expiryDate = auth.expiryDate;
  // console.log('authGetToken, token from state:', token);
  try {
    if (!token) {
      token = await AsyncStorage.getItem('token');
    }
    if (!expiryDate) {
      const data = await AsyncStorage.getItem('expiryDate');
      expiryDate = data ? +data : 0;
    }
  } catch (err) {
    console.log('Error while getting data from storage', err);
  }

  if (!expiryDate) {
    throw new Error('Expiry date not set');
  }

  if (!token) {
    throw new Error('Token not set');
  }

  const {error} = validateToken(token, expiryDate);

  if (!error) {
    return {token, expiryDate};
  }
  console.log(error);
  throw new Error('Error while getting token');
};

const authStoreToken = async (
  token: string,
  expiresIn: number,
  refreshToken: string,
) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiresIn * 1000;

  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('expiryDate', expiryDate.toString());
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return expiryDate;
  } catch (error) {
    console.log('Error while storing data to storage', error);
    return 0;
  }
};

export const tryAuth = createAsyncThunk(
  'auth/tryAuth',
  async (
    arg: {
      authData: {email: string; password: string};
      authMode: string;
    },
    {dispatch},
  ) => {
    dispatch(startLoading());

    try {
      const {authData, authMode} = arg;
      const parsedRes = await sendAuthRequest(authData, authMode);
      const expiryDate = await authStoreToken(
        parsedRes.idToken,
        parsedRes.expiresIn,
        parsedRes.refreshToken,
      );

      dispatch(authSetToken({token: parsedRes.idToken, expiryDate}));
      dispatch(stopLoading());
      goHome();
    } catch (error) {
      dispatch(stopLoading());
      console.log(error);
    }
  },
);

export const authGetToken = createAsyncThunk(
  'auth/getToken',
  async (arg, {getState, dispatch}) => {
    const {auth} = getState() as RootState;

    try {
      const {token, expiryDate} = await getTokenFromStorage(auth);
      dispatch(authSetToken({token, expiryDate}));

      if (!token) {
        throw new Error();
      }
      return token;
    } catch (error) {
      try {
        const res = await exchangeRefreshToken();
        const {id_token, expires_in, refresh_token} = res;

        const expiryDate = await authStoreToken(
          id_token,
          expires_in,
          refresh_token,
        );
        dispatch(authSetToken({token: id_token, expiryDate: expiryDate || 0}));

        return id_token;
      } catch (err) {
        clearStorage();
        throw err;
      }
    }
  },
);

export const authAutoSignIn = createAsyncThunk(
  'auth/autoSignIn',
  async (arg, thunkAPI) => {
    try {
      await thunkAPI.dispatch(authGetToken());
      // const state = thunkAPI.getState();
      goHome();
    } catch (error) {
      console.log('Failed to fetch token', error);
    }
  },
);

export const authLogout = createAsyncThunk('auth/logout', async () => {
  await clearStorage();
  goToAuth();
});
