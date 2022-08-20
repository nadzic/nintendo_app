import { combineReducers } from 'redux';
import {
  DELETE_PRODUCT_FROM_CART,
  DELETE_ALL_PRODUCTS_FROM_CART,
  ADD_PRODUCT_TO_CART,
  ADD_VARIANT_TO_CART,
  DELETE_VARIANT_FROM_CART,
  DELETE_ALL_VARIANTS_FROM_CART,
  ADD_QUANTITY_TO_CART,
  INCREASE_QUANTITY_IN_CART,
  DECREASE_QUANTITY_IN_CART,
  DELETE_QUANTITY_FROM_CART,
  DELETE_ALL_QUANTITIES_FROM_CART,
  DELETE_UPC_FROM_CART,
  ADD_UPC_TO_CART,
  DELETE_ALL_UPCS_FROM_CART,
} from 'nintendoapp/js/actions/actionTypes';

export const products = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product];
    case DELETE_PRODUCT_FROM_CART:
      return state.filter(product => product.id !== action.id);
    case DELETE_ALL_PRODUCTS_FROM_CART:
      return [];
    default:
      return state;
  }
};

export const variants = (state = [], action) => {
  switch (action.type) {
    case ADD_VARIANT_TO_CART:
      return [...state, action.variantId];
    case DELETE_VARIANT_FROM_CART:
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ];
    case DELETE_ALL_VARIANTS_FROM_CART:
      return [];
    default:
      return state;
  }
};

export const quantities = (state = [], action) => {
  switch (action.type) {
    case ADD_QUANTITY_TO_CART:
      return [...state, 1];
    case INCREASE_QUANTITY_IN_CART:
      return [
        ...state.slice(0, action.id),
        state[action.id] + 1,
        ...state.slice(action.id + 1),
      ];
    case DECREASE_QUANTITY_IN_CART:
      return [
        ...state.slice(0, action.id),
        state[action.id] - 1,
        ...state.slice(action.id + 1),
      ];
    case DELETE_QUANTITY_FROM_CART:
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ];
    case DELETE_ALL_QUANTITIES_FROM_CART:
      return [];
    default:
      return state;
  }
};

export const upcs = (state = [], action) => {
  switch (action.type) {
    case ADD_UPC_TO_CART:
      return [...state, action.upcCode];
    case DELETE_UPC_FROM_CART:
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ];
    case DELETE_ALL_UPCS_FROM_CART:
      return [];
    default:
      return state;
  }
};

const cart = combineReducers({
  products,
  variants,
  quantities,
  upcs,
});

export default cart;
