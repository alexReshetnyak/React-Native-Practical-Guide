import { TRY_AUTH } from './actionTypes';

export const tryAuth = authData => ({
  type: TRY_AUTH,
  authData
});


export const authSignup = authData => async dispatch => {
  await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]',
    {
      method: 'POST'
    }
  );
}
