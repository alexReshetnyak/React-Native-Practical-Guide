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
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const parsedRes = await res.json();
    dispatch(uiStopLoading());
    if (parsedRes.error) {
      throw new Error(parsedRes.error);
    }
    console.log("AUTH RESPONSE:", parsedRes);
    goHome();
  } catch (error) {
    dispatch(uiStopLoading());
    console.error(error);
    alert("Authentication failed, please try again");
  }
};
