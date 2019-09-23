import { API_KEY } from "../../config";
import { uiStartLoading, uiStopLoading } from "./index";
import { goHome } from "../../navigation/navigation";

export const tryAuth = (authData, authMode) => dispatch => {
  const body = {
    email:              authData.email,
    password:           authData.password,
    returnSecureToken:  true
  };
  const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  authMode === 'login' ? 
    dispatch(authUser(`${baseUrl}signInWithPassword?key=${API_KEY}`, body)) :
    dispatch(authUser(`${baseUrl}signUp?key=${API_KEY}`, body));
};

export const authUser = (url, body) => async dispatch => {
  try {
    dispatch(uiStartLoading());
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
    dispatch(uiStopLoading());
    if (parsedRes.error) {
      throw parsedRes.error;
    }
    console.log("AUTH RESPONSE:", parsedRes);
    goHome();
  } catch (error) {
    dispatch(uiStopLoading());
    console.log(error);
    alert("Authentication failed, please try again");
  }
};
