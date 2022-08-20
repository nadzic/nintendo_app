import { Keyboard } from 'react-native';
import { userService } from 'nintendoapp/js/services/userService';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGOUT,
  UPDATE_USER,
  REQUEST_RESET_PASSWORD,
  REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESEND_EMAIL,
  REQUEST_RESEND_EMAIL_SUCCESS,
  REQUEST_RESEND_EMAIL_FAILURE,
  REQUEST_SIGN_UP,
  DELETE_CURRENT_KITCHEN,
  REQUEST_SIGN_UP_SUCCESS,
  REQUEST_SIGN_UP_FAILURE,
  REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS,
} from 'nintendoapp/js/actions/actionTypes';
import {
  openUserNotConfirmedModal,
  openUserNotRegisteredModal,
  openIvalidCredentialsModal,
  openInvalidEmailFPModal,
  openResetPasswordModal,
  openEmailTakenModal,
  showThankYouSignupContent,
  openResendEmailModal,
} from 'nintendoapp/js/actions/uiActions';
import {
  goToScanKitchen,
  goToScanProduct,
  resetAndGoToLogin,
  goBack,
} from 'nintendoapp/js/actions/navigationActions';

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});

export const login = (email, password) => {
  return dispatch => {
    dispatch(request());

    return userService.login(email, password)
      .then(
        user => {
          Keyboard.dismiss();
          if (user.company_name && user.company_id) {
            const kitchen = {
              company_name: user.company_name,
              company_id: user.company_id,
            };
            dispatch(successAddCurrentKitchenInvisible(kitchen));
          }
          dispatch(success(user));
          dispatch(!user.company_name ? goToScanKitchen() : goToScanProduct());
        },
        errorCode => {
          if (errorCode === 400) {
            dispatch(openUserNotConfirmedModal());
          } else if (errorCode === 403) {
            dispatch(openIvalidCredentialsModal());
          } else if (errorCode === 404) {
            dispatch(openUserNotRegisteredModal());
          } else {
            dispatch(openIvalidCredentialsModal());
          }
          dispatch(failure(errorCode));
        },
      );
  };

  function request() { return { type: REQUEST_LOGIN }; }
  function success(user) { return { type: REQUEST_LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: REQUEST_LOGIN_FAILURE, error }; }
  function successAddCurrentKitchenInvisible(kitchen) {
    return { type: REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS, kitchen };
  }
};

export const logout = () => {
  return dispatch => {
    dispatch(requestLogout());
    dispatch(deleteCurrentKitchen());
    dispatch(resetAndGoToLogin());
  };

  function requestLogout() { return { type: REQUEST_LOGOUT }; }
  function deleteCurrentKitchen() { return { type: DELETE_CURRENT_KITCHEN }; }
};

export const reset = (email) => {
  return dispatch => {
    dispatch(request());

    return userService.reset(email)
      .then(
        data => {
          dispatch(success());
          dispatch(goBack());
          dispatch(openResetPasswordModal());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openInvalidEmailFPModal());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_RESET_PASSWORD }; }
  function success() { return { type: REQUEST_RESET_PASSWORD_SUCCESS }; }
  function failure() { return { type: REQUEST_RESET_PASSWORD_FAILURE }; }
};

export const resend = (email) => {
  return dispatch => {
    dispatch(request());

    return userService.resend(email)
      .then(
        data => {
          dispatch(success());
          dispatch(openResendEmailModal());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_RESEND_EMAIL }; }
  function success() { return { type: REQUEST_RESEND_EMAIL_SUCCESS }; }
  function failure() { return { type: REQUEST_RESEND_EMAIL_FAILURE }; }
};

export const register = (first_name, last_name, email, password) => {
  return dispatch => {
    dispatch(request());

    return userService.register(first_name, last_name, email, password)
      .then(
        user => {
          dispatch(success(user));
          dispatch(showThankYouSignupContent());
        },
        error => {
          dispatch(openEmailTakenModal());
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_SIGN_UP }; }
  function success(user) { return { type: REQUEST_SIGN_UP_SUCCESS, user }; }
  function failure(error) { return { type: REQUEST_SIGN_UP_FAILURE, error }; }
};

