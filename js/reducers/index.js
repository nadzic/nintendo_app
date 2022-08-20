import { combineReducers } from 'redux';
import cart from 'nintendoapp/js/reducers/cartReducer';
import ui from 'nintendoapp/js/reducers/uiReducer';
import auth from 'nintendoapp/js/reducers/authReducer';
import product from 'nintendoapp/js/reducers/productReducer';
import kitchen from 'nintendoapp/js/reducers/kitchenReducer';
import creditCard from 'nintendoapp/js/reducers/creditCardReducer';
import loading from 'nintendoapp/js/reducers/loadingReducer';
import signup from 'nintendoapp/js/reducers/signupReducer';

const nintendoApp = combineReducers({
  cart,
  ui,
  auth,
  product,
  kitchen,
  creditCard,
  loading,
  signup,
});

export default nintendoApp;
