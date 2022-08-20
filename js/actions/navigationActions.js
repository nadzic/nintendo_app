import {
  GO_BACK,
  GO_TO_LOGIN,
  GO_TO_SIGNUP,
  GO_TO_SCAN_PRODUCT,
  GO_TO_SCAN_KITCHEN,
  GO_TO_SHOPPING_CART,
  GO_TO_FORGOT_PASSWORD,
  GO_TO_ADD_PAYMENT,
  GO_TO_EDIT_PAYMENT,
  GO_TO_PAYMENT,
  GO_TO_PAYMENT_COMPLETE,
  RESET_AND_GO_TO_LOGIN,
} from 'nintendoapp/js/actions/actionTypes';

// main navigation actions
export const goBack = _ => ({
  type: GO_BACK,
});

export const goToLogin = _ => ({
  type: GO_TO_LOGIN,
});

export const goToSignup = _ => ({
  type: GO_TO_SIGNUP,
});

export const goToScanProduct = _ => ({
  type: GO_TO_SCAN_PRODUCT,
});

export const goToScanKitchen = _ => ({
  type: GO_TO_SCAN_KITCHEN,
});

export const goToShoppingCart = _ => ({
  type: GO_TO_SHOPPING_CART,
});

export const goToForgotPassword = _ => ({
  type: GO_TO_FORGOT_PASSWORD,
});

export const goToAddPayment = _ => ({
  type: GO_TO_ADD_PAYMENT,
});

export const goToEditPayment = _ => ({
  type: GO_TO_EDIT_PAYMENT,
});

export const goToPayment = _ => ({
  type: GO_TO_PAYMENT,
});

export const goToPaymentComplete = _ => ({
  type: GO_TO_PAYMENT_COMPLETE,
});

export const resetAndGoToLogin = _ => ({
  type: RESET_AND_GO_TO_LOGIN,
});
