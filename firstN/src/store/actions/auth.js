import { TRY_AUTH } from './actionTypes';
import { API_KEY } from '../../config';

export const tryAuth = authData => dispatch => {
  dispatch(authSignup(authData));
};


export const authSignup = authData => async dispatch => {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email             : authData.email,
          password          : authData.password,
          returnSecureToken : true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const parsedRes = await res.json();
    console.log('AUTH RESPONSE:', parsedRes);
  } catch (error) {
    console.error(error);
    alert('Authentication failed, please try again')
  }
}
