import auth from 'nintendoapp/js/reducers/authReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('auth reducer', () => {

  const user = {
    email: 'ardit.vula@ohmygreen.com',
    auth_token: 'token_example_which_comes_from_backend',
  };

  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_LOGIN', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_LOGIN_SUCCESS', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN_SUCCESS,
        user,
      },
    )).toEqual({ user });
  });

  it('should handle REQUEST_LOGIN_FAILURE', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN_FAILURE,
        error: 'Login failure',
      },
    )).toEqual({ error: 'Login failure' });
  });

  it('should handle REQUEST_LOGOUT', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGOUT,
      },
    )).toEqual({ });
  });
});
