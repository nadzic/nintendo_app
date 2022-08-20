import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  UPDATE_USER,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGOUT,
} from 'nintendoapp/js/actions/actionTypes';

const auth = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_LOGOUT:
      return {};
    case REQUEST_LOGIN_SUCCESS:
    case UPDATE_USER:
      return {
        user: action.user,
      };
    case REQUEST_LOGIN_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;
