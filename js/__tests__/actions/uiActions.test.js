import * as actions from 'nintendoapp/js/actions/uiActions';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('ui actions', () => {
  it('should create an action to open reset password modal', () => {
    const expectedAction = {
      type: types.OPEN_RESET_PASSWORD_MODAL,
    };
    expect(actions.openResetPasswordModal()).toEqual(expectedAction);
  });
  it('should create an action to close reset password modal', () => {
    const expectedAction = {
      type: types.CLOSE_RESET_PASSWORD_MODAL,
    };
    expect(actions.closeResetPasswordModal()).toEqual(expectedAction);
  });
  it('should create an action to open remove card modal', () => {
    const expectedAction = {
      type: types.OPEN_REMOVE_CARD_MODAL,
    };
    expect(actions.openRemoveCardModal()).toEqual(expectedAction);
  });
  it('should create an action to close remove card modal', () => {
    const expectedAction = {
      type: types.CLOSE_REMOVE_CARD_MODAL,
    };
    expect(actions.closeRemoveCardModal()).toEqual(expectedAction);
  });

  it('should create an action to open user not registered modal', () => {
    const expectedAction = {
      type: types.OPEN_USER_NOT_REGISTERED_MODAL,
    };
    expect(actions.openUserNotRegisteredModal()).toEqual(expectedAction);
  });
  it('should create an action to close user not registered modal', () => {
    const expectedAction = {
      type: types.CLOSE_USER_NOT_REGISTERED_MODAL,
    };
    expect(actions.closeUserNotRegisteredModal()).toEqual(expectedAction);
  });
  it('should create an action to open user not confirmed modal', () => {
    const expectedAction = {
      type: types.OPEN_USER_NOT_CONFIRMED_MODAL,
    };
    expect(actions.openUserNotConfirmedModal()).toEqual(expectedAction);
  });
  it('should create an action to close user not registred modal', () => {
    const expectedAction = {
      type: types.CLOSE_USER_NOT_CONFIRMED_MODAL,
    };
    expect(actions.closeUserNotConfirmedModal()).toEqual(expectedAction);
  });
  it('should create an action to open invalid credentials modal', () => {
    const expectedAction = {
      type: types.OPEN_INVALID_CREDENTIALS_MODAL,
    };
    expect(actions.openIvalidCredentialsModal()).toEqual(expectedAction);
  });
  it('should create an action to close invalid credentials modal', () => {
    const expectedAction = {
      type: types.CLOSE_INVALID_CREDENTIALS_MODAL,
    };
    expect(actions.closeInvalidCredentialsModal()).toEqual(expectedAction);
  });
  it('should create an action to open invalid email forgot password modal', () => {
    const expectedAction = {
      type: types.OPEN_INVALID_EMAIL_FP_MODAL,
    };
    expect(actions.openInvalidEmailFPModal()).toEqual(expectedAction);
  });
  it('should create an action to close invalid email forgot password modal', () => {
    const expectedAction = {
      type: types.CLOSE_INVALID_EMAIL_FP_MODAL,
    };
    expect(actions.closeInvalidEmailFPModal()).toEqual(expectedAction);
  });
  it('should create an action to open email taken modal', () => {
    const expectedAction = {
      type: types.OPEN_EMAIL_TAKEN_MODAL,
    };
    expect(actions.openEmailTakenModal()).toEqual(expectedAction);
  });
  it('should create an action to close email taken modal', () => {
    const expectedAction = {
      type: types.CLOSE_EMAIL_TAKEN_MODAL,
    };
    expect(actions.closeEmailTakenModal()).toEqual(expectedAction);
  });
  it('should create an action to open scan problem modal', () => {
    const expectedAction = {
      type: types.OPEN_SCAN_PRODUCT_PROBLEM_MODAL,
    };
    expect(actions.openScanProductProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close scan problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_SCAN_PRODUCT_PROBLEM_MODAL,
    };
    expect(actions.closeScanProductProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open scan product no record modal', () => {
    const expectedAction = {
      type: types.OPEN_SCAN_PRODUCT_NO_RECORD_MODAL,
    };
    expect(actions.openScanProductNoRecordModal()).toEqual(expectedAction);
  });
  it('should create an action to close scan product no record modal', () => {
    const expectedAction = {
      type: types.CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL,
    };
    expect(actions.closeScanProductNoRecordModal()).toEqual(expectedAction);
  });
  it('should create an action to open scan kitchen problem modal', () => {
    const expectedAction = {
      type: types.OPEN_SCAN_KITCHEN_PROBLEM_MODAL,
    };
    expect(actions.openScanKitchenProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close scan kitchen problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_SCAN_KITCHEN_PROBLEM_MODAL,
    };
    expect(actions.closeScanKitchenProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open scan kitchen no record modal', () => {
    const expectedAction = {
      type: types.OPEN_SCAN_KITCHEN_NO_RECORD_MODAL,
    };
    expect(actions.openScanKitchenNoRecordModal()).toEqual(expectedAction);
  });
  it('should create an action to open processing payment problem modal', () => {
    const expectedAction = {
      type: types.OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.openProcessingPaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close processing payment problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.closeProcessingPaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open add payment problem modal', () => {
    const expectedAction = {
      type: types.OPEN_ADD_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.openAddPaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close add payment problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_ADD_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.closeAddPaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open delete payment problem modal', () => {
    const expectedAction = {
      type: types.OPEN_DELETE_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.openDeletePaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close delete payment problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_DELETE_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.closeDeletePaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open update payment problem modal', () => {
    const expectedAction = {
      type: types.OPEN_UPDATE_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.openUpdatePaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to close update payment problem modal', () => {
    const expectedAction = {
      type: types.CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL,
    };
    expect(actions.closeUpdatePaymentProblemModal()).toEqual(expectedAction);
  });
  it('should create an action to open resend email modal', () => {
    const expectedAction = {
      type: types.OPEN_RESEND_EMAIL_MODAL,
    };
    expect(actions.openResendEmailModal()).toEqual(expectedAction);
  });
  it('should create an action to show thank you signup content', () => {
    const expectedAction = {
      type: types.SHOW_THANK_YOU_SIGNUP_CONTENT,
    };
    expect(actions.showThankYouSignupContent()).toEqual(expectedAction);
  });
  it('should create an action to hide thank you signup content', () => {
    const expectedAction = {
      type: types.HIDE_THANK_YOU_SIGNUP_CONTENT,
    };
    expect(actions.hideThankYouSignupContent()).toEqual(expectedAction);
  });
  it('should create an action to show go to add payment content', () => {
    const expectedAction = {
      type: types.SHOW_GO_TO_ADD_PAYMENT_CONTENT,
    };
    expect(actions.showGoToAddPaymentContent()).toEqual(expectedAction);
  });
  it('should create an action to hide go to add payment content', () => {
    const expectedAction = {
      type: types.HIDE_GO_TO_ADD_PAYMENT_CONTENT,
    };
    expect(actions.hideGoToAddPaymentContent()).toEqual(expectedAction);
  });
});
