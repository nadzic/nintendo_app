import {
  REQUEST_SIGN_UP,
  REQUEST_SIGN_UP_SUCCESS,
  REQUEST_SIGN_UP_FAILURE,
} from 'nintendoapp/js/actions/actionTypes';

const signup = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SIGN_UP:
      return {};
    case REQUEST_SIGN_UP_SUCCESS:
      return {
        user: action.user,
      };
    case REQUEST_SIGN_UP_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default signup;
