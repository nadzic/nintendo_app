import NavigationService from 'nintendoapp/js/utils/navigation';
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

const navigation = store => next => action => {
  switch (action.type) {
    case GO_BACK:
      NavigationService.goBack();
      break;
    case GO_TO_LOGIN:
      NavigationService.navigate('Login');
      break;
    case GO_TO_SIGNUP:
      NavigationService.navigate('Signup');
      break;
    case GO_TO_SCAN_PRODUCT:
      NavigationService.navigate('ScanProduct');
      break;
    case GO_TO_SCAN_KITCHEN:
      NavigationService.navigate('ScanKitchen');
      break;
    case GO_TO_SHOPPING_CART:
      NavigationService.navigate('ShoppingCart');
      break;
    case GO_TO_FORGOT_PASSWORD:
      NavigationService.navigate('ForgotPassword');
      break;
    case GO_TO_ADD_PAYMENT:
      NavigationService.navigate('AddPayment');
      break;
    case GO_TO_EDIT_PAYMENT:
      NavigationService.navigate('EditPayment');
      break;
    case GO_TO_PAYMENT:
      NavigationService.navigate('Payment');
      break;
    case GO_TO_PAYMENT_COMPLETE:
      NavigationService.navigate('PaymentComplete');
      break;
    case RESET_AND_GO_TO_LOGIN:
      NavigationService.resetState('Login');
      break;
    default:
      break;
  }
  next(action);
};

export default navigation;
