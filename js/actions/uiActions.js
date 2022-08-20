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

export const openResetPasswordModal = () => ({
  type: OPEN_RESET_PASSWORD_MODAL,
});

export const closeResetPasswordModal = () => ({
  type: CLOSE_RESET_PASSWORD_MODAL,
});

export const openRemoveCardModal = () => ({
  type: OPEN_REMOVE_CARD_MODAL,
});

export const closeRemoveCardModal = () => ({
  type: CLOSE_REMOVE_CARD_MODAL,
});

export const openIvalidCredentialsModal = () => ({
  type: OPEN_INVALID_CREDENTIALS_MODAL,
});

export const closeInvalidCredentialsModal = () => ({
  type: CLOSE_INVALID_CREDENTIALS_MODAL,
});

export const openUserNotConfirmedModal = () => ({
  type: OPEN_USER_NOT_CONFIRMED_MODAL,
});

export const closeUserNotConfirmedModal = () => ({
  type: CLOSE_USER_NOT_CONFIRMED_MODAL,
});

export const openUserNotRegisteredModal = () => ({
  type: OPEN_USER_NOT_REGISTERED_MODAL,
});

export const closeUserNotRegisteredModal = () => ({
  type: CLOSE_USER_NOT_REGISTERED_MODAL,
});

export const openInvalidEmailFPModal = () => ({
  type: OPEN_INVALID_EMAIL_FP_MODAL,
});

export const closeInvalidEmailFPModal = () => ({
  type: CLOSE_INVALID_EMAIL_FP_MODAL,
});

export const openEmailTakenModal = () => ({
  type: OPEN_EMAIL_TAKEN_MODAL,
});

export const closeEmailTakenModal = () => ({
  type: CLOSE_EMAIL_TAKEN_MODAL,
});

export const openScanProductProblemModal = () => ({
  type: OPEN_SCAN_PRODUCT_PROBLEM_MODAL,
});

export const closeScanProductProblemModal = () => ({
  type: CLOSE_SCAN_PRODUCT_PROBLEM_MODAL,
});

export const openScanProductNoRecordModal = () => ({
  type: OPEN_SCAN_PRODUCT_NO_RECORD_MODAL,
});

export const closeScanProductNoRecordModal = () => ({
  type: CLOSE_SCAN_PRODUCT_NO_RECORD_MODAL,
});

export const openScanKitchenProblemModal = () => ({
  type: OPEN_SCAN_KITCHEN_PROBLEM_MODAL,
});

export const closeScanKitchenProblemModal = () => ({
  type: CLOSE_SCAN_KITCHEN_PROBLEM_MODAL,
});

export const openScanKitchenNoRecordModal = () => ({
  type: OPEN_SCAN_KITCHEN_NO_RECORD_MODAL,
});

export const closeScanKitchenNoRecordModal = () => ({
  type: CLOSE_SCAN_KITCHEN_NO_RECORD_MODAL,
});

export const openProcessingPaymentProblemModal = () => ({
  type: OPEN_PROCESSING_PAYMENT_PROBLEM_MODAL,
});

export const closeProcessingPaymentProblemModal = () => ({
  type: CLOSE_PROCESSING_PAYMENT_PROBLEM_MODAL,
});

export const openAddPaymentProblemModal = () => ({
  type: OPEN_ADD_PAYMENT_PROBLEM_MODAL,
});

export const closeAddPaymentProblemModal = () => ({
  type: CLOSE_ADD_PAYMENT_PROBLEM_MODAL,
});

export const openDeletePaymentProblemModal = () => ({
  type: OPEN_DELETE_PAYMENT_PROBLEM_MODAL,
});

export const closeDeletePaymentProblemModal = () => ({
  type: CLOSE_DELETE_PAYMENT_PROBLEM_MODAL,
});

export const openUpdatePaymentProblemModal = () => ({
  type: OPEN_UPDATE_PAYMENT_PROBLEM_MODAL,
});

export const closeUpdatePaymentProblemModal = () => ({
  type: CLOSE_UPDATE_PAYMENT_PROBLEM_MODAL,
});

export const openResendEmailModal = () => ({
  type: OPEN_RESEND_EMAIL_MODAL,
});

export const closeResendEmailModal = () => ({
  type: CLOSE_RESEND_EMAIL_MODAL,
});

export const showThankYouSignupContent = () => ({
  type: SHOW_THANK_YOU_SIGNUP_CONTENT,
});

export const hideThankYouSignupContent = () => ({
  type: HIDE_THANK_YOU_SIGNUP_CONTENT,
});

export const showGoToAddPaymentContent = () => ({
  type: SHOW_GO_TO_ADD_PAYMENT_CONTENT,
});

export const hideGoToAddPaymentContent = () => ({
  type: HIDE_GO_TO_ADD_PAYMENT_CONTENT,
});
