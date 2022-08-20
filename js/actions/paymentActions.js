import {
  REQUEST_ADD_CREDIT_CARD,
  REQUEST_ADD_CREDIT_CARD_SUCCESS,
  REQUEST_ADD_CREDIT_CARD_FAILURE,
  REQUEST_GET_CREDIT_CARD,
  REQUEST_GET_CREDIT_CARD_SUCCESS,
  REQUEST_GET_CREDIT_CARD_FAILURE,
  REQUEST_UPDATE_CREDIT_CARD,
  REQUEST_UPDATE_CREDIT_CARD_SUCCESS,
  REQUEST_UPDATE_CREDIT_CARD_FAILURE,
  REQUEST_DELETE_CREDIT_CARD,
  REQUEST_DELETE_CREDIT_CARD_SUCCESS,
  REQUEST_DELETE_CREDIT_CARD_FAILURE,
} from 'nintendoapp/js/actions/actionTypes';
import { paymentService } from 'nintendoapp/js/services/paymentService';
import {
  openAddPaymentProblemModal,
  closeRemoveCardModal,
  openDeletePaymentProblemModal,
  openUpdatePaymentProblemModal,
  showGoToAddPaymentContent,
  hideGoToAddPaymentContent,
} from 'nintendoapp/js/actions/uiActions';
import { logout } from 'nintendoapp/js/actions/userActions';
import {
  goBack,
  resetAndGoToLogin,
} from 'nintendoapp/js/actions/navigationActions';

export const addCreditCard = (auth_token, number, exp_month, exp_year, cvc, address_zip) => {
  return dispatch => {
    dispatch(request());

    return paymentService.addCreditCard(auth_token, number, exp_month, exp_year, cvc, address_zip)
      .then(
        data => {
          dispatch(success(data.customer));
          dispatch(goBack());
          dispatch(hideGoToAddPaymentContent());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openAddPaymentProblemModal());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_ADD_CREDIT_CARD }; }
  function success(customer) { return { type: REQUEST_ADD_CREDIT_CARD_SUCCESS, customer }; }
  function failure() { return { type: REQUEST_ADD_CREDIT_CARD_FAILURE }; }
};

export const getCreditCard = (auth_token) => {
  return dispatch => {
    dispatch(request());

    return paymentService.getCreditCard(auth_token)
      .then(
        data => {
          dispatch(success(data.customer));
          dispatch(hideGoToAddPaymentContent());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(showGoToAddPaymentContent());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_GET_CREDIT_CARD }; }
  function success(customer) { return { type: REQUEST_GET_CREDIT_CARD_SUCCESS, customer }; }
  function failure() { return { type: REQUEST_GET_CREDIT_CARD_FAILURE }; }
};

export const updateCreditCard = (auth_token, exp_month, exp_year, address_zip) => {
  return dispatch => {
    dispatch(request());

    return paymentService.updateCreditCard(auth_token, exp_month, exp_year, address_zip)
      .then(
        data => {
          dispatch(success(data.customer));
          dispatch(goBack());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openUpdatePaymentProblemModal());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_UPDATE_CREDIT_CARD }; }
  function success(customer) { return { type: REQUEST_UPDATE_CREDIT_CARD_SUCCESS, customer }; }
  function failure() { return { type: REQUEST_UPDATE_CREDIT_CARD_FAILURE }; }
};

export const deleteCreditCard = (auth_token) => {
  return dispatch => {
    dispatch(request());
    dispatch(closeRemoveCardModal());

    return paymentService.deleteCreditCard(auth_token)
      .then(
        data => {
          dispatch(success());
          dispatch(showGoToAddPaymentContent());
          dispatch(goBack());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(closeRemoveCardModal());
            dispatch(openDeletePaymentProblemModal());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_DELETE_CREDIT_CARD }; }
  function success() { return { type: REQUEST_DELETE_CREDIT_CARD_SUCCESS }; }
  function failure() { return { type: REQUEST_DELETE_CREDIT_CARD_FAILURE }; }
};
