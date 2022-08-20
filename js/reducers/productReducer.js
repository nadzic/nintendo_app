import {
  REQUEST_ADD_CURRENT_PRODUCT,
  REQUEST_ADD_CURRENT_PRODUCT_SUCCESS,
  REQUEST_ADD_CURRENT_PRODUCT_FAILURE,
  DELETE_CURRENT_PRODUCT,
} from 'nintendoapp/js/actions/actionTypes';

const initialState = {
  currentProductVisible: false,
};

const product = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ADD_CURRENT_PRODUCT:
      return {
        currentProduct: action.product,
        currentProductVisible: false,
      };
    case REQUEST_ADD_CURRENT_PRODUCT_SUCCESS:
      return {
        currentProduct: action.product,
        currentProductVisible: true,
      };
    case REQUEST_ADD_CURRENT_PRODUCT_FAILURE:
      return {
        currentProduct: {},
        currentProductVisible: false,
        error: action.error,
      };
    case DELETE_CURRENT_PRODUCT:
      return {
        currentProduct: {},
        currentProductVisible: false,
      };
    default:
      return state;
  }
};

export default product;
