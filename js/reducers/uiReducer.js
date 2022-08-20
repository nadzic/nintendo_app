import { combineReducers } from 'redux';
import {
  OPEN_RESET_PASSWORD_MODAL,
  CLOSE_RESET_PASSWORD_MODAL,
  OPEN_REMOVE_CARD_MODAL,
  CLOSE_REMOVE_CARD_MODAL,
  OPEN_USER_NOT_CONFIRMED_MODAL,
  CLOSE_USER_NOT_CONFIRMED_MODAL,
  OPEN_USER_NOT_REGISTERED_MODAL,
  CLOSE_USER_NOT_REGISTERED_MODAL,
  OPEN_INVALID_CREDENTIALS_MODAL,
  CLOSE_INVALID_CREDENTIALS_MODAL,
  OPEN_INVALID_EMAIL_FP_MODAL,
  CLOSE_INVALID_EMAIL_FP_MODAL,
  OPEN_EMAIL_TAKEN_MODAL,
  CLOSE_EMAIL_TAKEN_MODAL,
  OPEN_SCAN_PRODUCT_PROBLEM_MODAL,
  CLOSE_SCAN_PRODUCT_PROBLEM_MODAL,
  OPEN_SCAN_PRODUCT_NO_RECORD_MODAL,
  CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL,
  OPEN_SCAN_KITCHEN_PROBLEM_MODAL,
  CLOSE_SCAN_KITCHEN_PROBLEM_MODAL,
  OPEN_SCAN_KITCHEN_NO_RECORD_MODAL,
  CLOSE_SCAN_KITCHEN_NO_RECORD_MODAL,
  OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL,
  CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL,
  OPEN_ADD_PAYMENT_PROBLEM_MODAL,
  CLOSE_ADD_PAYMENT_PROBLEM_MODAL,
  OPEN_DELETE_PAYMENT_PROBLEM_MODAL,
  CLOSE_DELETE_PAYMENT_PROBLEM_MODAL,
  OPEN_UPDATE_PAYMENT_PROBLEM_MODAL,
  CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL,
  OPEN_RESEND_EMAIL_MODAL,
  CLOSE_RESEND_EMAIL_MODAL,
  SHOW_THANK_YOU_SIGNUP_CONTENT,
  HIDE_THANK_YOU_SIGNUP_CONTENT,
  SHOW_GO_TO_ADD_PAYMENT_CONTENT,
  HIDE_GO_TO_ADD_PAYMENT_CONTENT,
} from 'nintendoapp/js/actions/actionTypes';

export function resetPasswordModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_RESET_PASSWORD_MODAL:
      return true;
    case CLOSE_RESET_PASSWORD_MODAL:
      return false;
    default:
      return state;
  }
}

export function removeCardModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_REMOVE_CARD_MODAL:
      return true;
    case CLOSE_REMOVE_CARD_MODAL:
      return false;
    default:
      return state;
  }
}

export function invalidCredentialsModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_INVALID_CREDENTIALS_MODAL:
      return true;
    case CLOSE_INVALID_CREDENTIALS_MODAL:
      return false;
    default:
      return state;
  }
}

export function userNotRegisteredModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_USER_NOT_REGISTERED_MODAL:
      return true;
    case CLOSE_USER_NOT_REGISTERED_MODAL:
      return false;
    default:
      return state;
  }
}

export function userNotConfirmedModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_USER_NOT_CONFIRMED_MODAL:
      return true;
    case CLOSE_USER_NOT_CONFIRMED_MODAL:
      return false;
    default:
      return state;
  }
}

export function invalidEmailFPModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_INVALID_EMAIL_FP_MODAL:
      return true;
    case CLOSE_INVALID_EMAIL_FP_MODAL:
      return false;
    default:
      return state;
  }
}

export function emailTakenModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_EMAIL_TAKEN_MODAL:
      return true;
    case CLOSE_EMAIL_TAKEN_MODAL:
      return false;
    default:
      return state;
  }
}

export function scanProductProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_SCAN_PRODUCT_PROBLEM_MODAL:
      return true;
    case CLOSE_SCAN_PRODUCT_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function scanProductNoRecordModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_SCAN_PRODUCT_NO_RECORD_MODAL:
      return true;
    case CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL:
      return false;
    default:
      return state;
  }
}

export function scanKitchenProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_SCAN_KITCHEN_PROBLEM_MODAL:
      return true;
    case CLOSE_SCAN_KITCHEN_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function scanKitchenNoRecordModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_SCAN_KITCHEN_NO_RECORD_MODAL:
      return true;
    case CLOSE_SCAN_KITCHEN_NO_RECORD_MODAL:
      return false;
    default:
      return state;
  }
}

export function processingPaymentProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL:
      return true;
    case CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function addPaymentProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_ADD_PAYMENT_PROBLEM_MODAL:
      return true;
    case CLOSE_ADD_PAYMENT_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function deletePaymentProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_DELETE_PAYMENT_PROBLEM_MODAL:
      return true;
    case CLOSE_DELETE_PAYMENT_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function updatePaymentProblemModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_UPDATE_PAYMENT_PROBLEM_MODAL:
      return true;
    case CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL:
      return false;
    default:
      return state;
  }
}

export function resendEmailModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_RESEND_EMAIL_MODAL:
      return true;
    case CLOSE_RESEND_EMAIL_MODAL:
      return false;
    default:
      return state;
  }
}

export function thankYouSignupContentVisible(state = false, action) {
  switch (action.type) {
    case SHOW_THANK_YOU_SIGNUP_CONTENT:
      return true;
    case HIDE_THANK_YOU_SIGNUP_CONTENT:
      return false;
    default:
      return state;
  }
}

export function goToAddPaymentContentVisible(state = false, action) {
  switch (action.type) {
    case SHOW_GO_TO_ADD_PAYMENT_CONTENT:
      return true;
    case HIDE_GO_TO_ADD_PAYMENT_CONTENT:
      return false;
    default:
      return state;
  }
}

export const ui = combineReducers({
  resetPasswordModalOpen,
  removeCardModalOpen,
  invalidCredentialsModalOpen,
  userNotRegisteredModalOpen,
  userNotConfirmedModalOpen,
  invalidEmailFPModalOpen,
  emailTakenModalOpen,
  scanProductProblemModalOpen,
  scanProductNoRecordModalOpen,
  scanKitchenProblemModalOpen,
  scanKitchenNoRecordModalOpen,
  processingPaymentProblemModalOpen,
  addPaymentProblemModalOpen,
  deletePaymentProblemModalOpen,
  updatePaymentProblemModalOpen,
  resendEmailModalOpen,
  thankYouSignupContentVisible,
  goToAddPaymentContentVisible,
});

export default ui;
