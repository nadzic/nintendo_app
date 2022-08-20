import signup from 'nintendoapp/js/reducers/signupReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('signup reducer', () => {

  const user = {
    email: 'ardit.vula@ohmygreen.com',
    auth_token: 'token_example_which_comes_from_backend',
  };

  it('should return the initial state', () => {
    expect(signup(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_SIGN_UP', () => {
    expect(signup(
      undefined,
      {
        type: types.REQUEST_SIGN_UP,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_SIGN_UP_SUCCESS', () => {
    expect(signup(
      undefined,
      {
        type: types.REQUEST_SIGN_UP_SUCCESS,
        user,
      },
    )).toEqual({ user });
  });

  it('should handle REQUEST_SIGN_UP_FAILURE', () => {
    expect(signup(
      undefined,
      {
        type: types.REQUEST_SIGN_UP_FAILURE,
        error: 'Signup failure',
      },
    )).toEqual({ error: 'Signup failure' });
  });
});
