import * as uiReducer from 'nintendoapp/js/reducers/uiReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('ui reducer', () => {

  const initialState = {
    resetPasswordModalOpen: false,
    resendEmailModalOpen: false,
    removeCardModalOpen: false,
    invalidCredentialsModalOpen: false,
    invalidEmailFPModalOpen: false,
    emailTakenModalOpen: false,
    scanProductProblemModalOpen: false,
    scanProductNoRecordModalOpen: false,
    scanKitchenProblemModalOpen: false,
    scanKitchenNoRecordModalOpen: false,
    processingPaymentProblemModalOpen: false,
    addPaymentProblemModalOpen: false,
    deletePaymentProblemModalOpen: false,
    updatePaymentProblemModalOpen: false,
    thankYouSignupContentVisible: false,
    goToAddPaymentContentVisible: false,
    userNotRegisteredModalOpen: false,
    userNotConfirmedModalOpen: false,
  };

  it('should return the initial state', () => {
    expect(uiReducer.ui(undefined, {})).toEqual(initialState);
  });
});

describe('resetPasswordModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.resetPasswordModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_RESET_PASSWORD_MODAL', () => {
    expect(uiReducer.resetPasswordModalOpen(
      undefined,
      {
        type: types.OPEN_RESET_PASSWORD_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_RESET_PASSWORD_MODAL', () => {
    expect(uiReducer.resetPasswordModalOpen(
      undefined,
      {
        type: types.CLOSE_RESET_PASSWORD_MODAL,
      },
    )).toEqual(false);
  });
});

describe('removeCardModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.removeCardModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_REMOVE_CARD_MODAL', () => {
    expect(uiReducer.removeCardModalOpen(
      undefined,
      {
        type: types.OPEN_REMOVE_CARD_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_REMOVE_CARD_MODAL', () => {
    expect(uiReducer.removeCardModalOpen(
      undefined,
      {
        type: types.CLOSE_REMOVE_CARD_MODAL,
      },
    )).toEqual(false);
  });
});

describe('invalidCredentialsModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.invalidCredentialsModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_INVALID_CREDENTIALS_MODAL', () => {
    expect(uiReducer.invalidCredentialsModalOpen(
      undefined,
      {
        type: types.OPEN_INVALID_CREDENTIALS_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_INVALID_CREDENTIALS_MODAL', () => {
    expect(uiReducer.invalidCredentialsModalOpen(
      undefined,
      {
        type: types.CLOSE_INVALID_CREDENTIALS_MODAL,
      },
    )).toEqual(false);
  });
});

describe('userNotRegisteredModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.userNotRegisteredModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_USER_NOT_REGISTERED_MODAL', () => {
    expect(uiReducer.userNotRegisteredModalOpen(
      undefined,
      {
        type: types.OPEN_USER_NOT_REGISTERED_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_USER_NOT_REGISTERED_MODAL', () => {
    expect(uiReducer.userNotRegisteredModalOpen(
      undefined,
      {
        type: types.CLOSE_USER_NOT_REGISTERED_MODAL,
      },
    )).toEqual(false);
  });
});

describe('userNotConfirmedModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.userNotConfirmedModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_USER_NOT_CONFIRMED_MODAL', () => {
    expect(uiReducer.userNotConfirmedModalOpen(
      undefined,
      {
        type: types.OPEN_USER_NOT_CONFIRMED_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_USER_NOT_CONFIRMED_MODAL', () => {
    expect(uiReducer.userNotConfirmedModalOpen(
      undefined,
      {
        type: types.CLOSE_USER_NOT_CONFIRMED_MODAL,
      },
    )).toEqual(false);
  });
});

describe('invalidEmailFPModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.invalidEmailFPModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_INVALID_EMAIL_FP_MODAL', () => {
    expect(uiReducer.invalidEmailFPModalOpen(
      undefined,
      {
        type: types.OPEN_INVALID_EMAIL_FP_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_INVALID_EMAIL_FP_MODAL', () => {
    expect(uiReducer.invalidEmailFPModalOpen(
      undefined,
      {
        type: types.CLOSE_INVALID_EMAIL_FP_MODAL,
      },
    )).toEqual(false);
  });
});

describe('emailTakenModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.emailTakenModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_EMAIL_TAKEN_MODAL', () => {
    expect(uiReducer.emailTakenModalOpen(
      undefined,
      {
        type: types.OPEN_EMAIL_TAKEN_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_EMAIL_TAKEN_MODAL', () => {
    expect(uiReducer.emailTakenModalOpen(
      undefined,
      {
        type: types.CLOSE_EMAIL_TAKEN_MODAL,
      },
    )).toEqual(false);
  });
});

describe('scanProductProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.scanProductProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_SCAN_PRODUCT_PROBLEM_MODAL', () => {
    expect(uiReducer.scanProductProblemModalOpen(
      undefined,
      {
        type: types.OPEN_SCAN_PRODUCT_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_SCAN_PROBLEM_MODAL', () => {
    expect(uiReducer.scanProductProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_SCAN_PRODUCT_PROBLEM_MODALL,
      },
    )).toEqual(false);
  });
});

describe('scanProductNoRecordModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.scanProductNoRecordModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_SCAN_PRODUCT_NO_RECORD_MODAL', () => {
    expect(uiReducer.scanProductNoRecordModalOpen(
      undefined,
      {
        type: types.OPEN_SCAN_PRODUCT_NO_RECORD_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL', () => {
    expect(uiReducer.scanProductNoRecordModalOpen(
      undefined,
      {
        type: types.CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL,
      },
    )).toEqual(false);
  });
});

describe('scanKitchenProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.scanKitchenProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_SCAN_KITCHEN_PROBLEM_MODAL', () => {
    expect(uiReducer.scanKitchenProblemModalOpen(
      undefined,
      {
        type: types.OPEN_SCAN_KITCHEN_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_SCAN_KITCHEN_PROBLEM_MODAL', () => {
    expect(uiReducer.scanKitchenProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_SCAN_KITCHEN_PROBLEM_MODALL,
      },
    )).toEqual(false);
  });
});

describe('scanKitchenNoRecordModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.scanKitchenNoRecordModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_SCAN_KITCHEN_UNDEFINED_MODAL', () => {
    expect(uiReducer.scanKitchenNoRecordModalOpen(
      undefined,
      {
        type: types.OPEN_SCAN_KITCHEN_NO_RECORD_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_SCAN_KITCHEN_NO_RECORD_MODAL', () => {
    expect(uiReducer.scanKitchenNoRecordModalOpen(
      undefined,
      {
        type: types.CLOSE_SCAN_KITCHEN_NO_RECORD_MODAL,
      },
    )).toEqual(false);
  });
});

describe('processingPaymentProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.processingPaymentProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.processingPaymentProblemModalOpen(
      undefined,
      {
        type: types.OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.processingPaymentProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(false);
  });
});

describe('addPaymentProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.addPaymentProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_ADD_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.addPaymentProblemModalOpen(
      undefined,
      {
        type: types.OPEN_ADD_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_ADD_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.addPaymentProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_ADD_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(false);
  });
});

describe('deletePaymentProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.deletePaymentProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_DELETE_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.deletePaymentProblemModalOpen(
      undefined,
      {
        type: types.OPEN_DELETE_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_DELETE_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.deletePaymentProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_DELETE_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(false);
  });
});

describe('updatePaymentProblemModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.updatePaymentProblemModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_UPDATE_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.updatePaymentProblemModalOpen(
      undefined,
      {
        type: types.OPEN_UPDATE_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL', () => {
    expect(uiReducer.updatePaymentProblemModalOpen(
      undefined,
      {
        type: types.CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL,
      },
    )).toEqual(false);
  });
});

describe('resendEmailModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.resendEmailModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_RESEND_EMAIL_MODAL', () => {
    expect(uiReducer.resendEmailModalOpen(
      undefined,
      {
        type: types.OPEN_RESEND_EMAIL_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_RESEND_EMAIL_MODAL', () => {
    expect(uiReducer.resendEmailModalOpen(
      undefined,
      {
        type: types.CLOSE_RESEND_EMAIL_MODAL,
      },
    )).toEqual(false);
  });
});

describe('thankYouSignupContentVisible reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.thankYouSignupContentVisible(undefined, {})).toEqual(false);
  });

  it('should handle SHOW_THANK_YOU_SIGNUP_CONTENT', () => {
    expect(uiReducer.thankYouSignupContentVisible(
      undefined,
      {
        type: types.SHOW_THANK_YOU_SIGNUP_CONTENT,
      },
    )).toEqual(true);
  });

  it('should handle HIDE_THANK_YOU_SIGNUP_CONTENT', () => {
    expect(uiReducer.thankYouSignupContentVisible(
      undefined,
      {
        type: types.HIDE_THANK_YOU_SIGNUP_CONTENT,
      },
    )).toEqual(false);
  });
});

describe('goToAddPaymentContentVisible reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.goToAddPaymentContentVisible(undefined, {})).toEqual(false);
  });

  it('should handle SHOW_GO_TO_ADD_PAYMENT_CONTENT', () => {
    expect(uiReducer.goToAddPaymentContentVisible(
      undefined,
      {
        type: types.SHOW_GO_TO_ADD_PAYMENT_CONTENT,
      },
    )).toEqual(true);
  });

  it('should handle HIDE_GO_TO_ADD_PAYMENT_CONTENT', () => {
    expect(uiReducer.goToAddPaymentContentVisible(
      undefined,
      {
        type: types.HIDE_GO_TO_ADD_PAYMENT_CONTENT,
      },
    )).toEqual(false);
  });
});
