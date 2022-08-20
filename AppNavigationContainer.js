import { createAppContainer, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from 'nintendoapp/js/components/auth-loading/AuthLoadingScreen';
import LoginScreen from 'nintendoapp/js/components/login/LoginScreen';
import SignupScreen from 'nintendoapp/js/components/signup/SignupScreen';
import ScanProductScreen from 'nintendoapp/js/components/scan/ScanProductScreen';
import ScanKitchenScreen from 'nintendoapp/js/components/scan/ScanKitchenScreen';
import ShoppingCartScreen from 'nintendoapp/js/components/shopping-cart/ShoppingCartScreen';
import ForgotPasswordScreen from 'nintendoapp/js/components/forgot-password/ForgotPasswordScreen';
import AddPaymentScreen from 'nintendoapp/js/components/payment/AddPaymentScreen';
import PaymentScreen from 'nintendoapp/js/components/payment/PaymentScreen';
import PaymentCompleteScreen from 'nintendoapp/js/components/payment/PaymentCompleteScreen';
import EditPaymentScreen from 'nintendoapp/js/components/payment/EditPaymentScreen';

const MainCardNavigator = createStackNavigator({
  Auth: {
    screen: AuthLoadingScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  ScanProduct: {
    screen: ScanProductScreen,
    navigationOptions: {
      header: null,
    },
  },
  ScanKitchen: {
    screen: ScanKitchenScreen,
    navigationOptions: {
      header: null,
    },
  },
  Payment: { screen: PaymentScreen },
  ShoppingCart: { screen: ShoppingCartScreen },
  PaymentComplete: { screen: PaymentCompleteScreen },
}, {
  initialRouteName: 'Auth',
});

export const MainModalNavigator = createStackNavigator(
  {
    AppNavigator: {
      screen: MainCardNavigator,
      navigationOptions: {
        header: null,
      },
    },
    // here we set what use as modal
    ForgotPassword: { screen: ForgotPasswordScreen },
    AddPayment: { screen: AddPaymentScreen },
    EditPayment: { screen: EditPaymentScreen },
    Signup: { screen: SignupScreen },
  },
  {
    mode: 'modal',
  },
);

export const AppNavigationContainer = createAppContainer(MainModalNavigator);
