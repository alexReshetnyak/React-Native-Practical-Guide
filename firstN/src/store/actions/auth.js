import { API_KEY } from "../../config";
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

      dispatch(authSetToken(parsedRes.idToken));
      dispatch(uiStopLoading());
      goHome();
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
      alert("Authentication failed, please try again");
    }
};


export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});


export const authGetToken = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const token = getState().auth.token;
    !token  && reject('Token missed');
    token   && resolve(token);
  });
};
