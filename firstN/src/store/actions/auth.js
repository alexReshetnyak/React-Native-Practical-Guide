import { TRY_AUTH } from "./actionTypes";
import { API_KEY } from "../../config";
import { uiStartLoading, uiStopLoading } from "./index";
import { goHome } from "../../navigation/navigation";

export const tryAuth = authData => dispatch => {
  dispatch(authSignup(authData));
};

export const authSignup = authData => async dispatch => {
  try {
    dispatch(uiStartLoading());
    const body = {
      email:              authData.email,
      password:           authData.password,
      returnSecureToken:  true
    };
    
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
