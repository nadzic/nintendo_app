import {
  REQUEST_ADD_CURRENT_KITCHEN,
  REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS,
  REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS,
  REQUEST_ADD_CURRENT_KITCHEN_FAILURE,
  DELETE_CURRENT_KITCHEN,
} from 'nintendoapp/js/actions/actionTypes';

const initialState = {
  currentKitchenVisible: false,
};

const kitchen = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ADD_CURRENT_KITCHEN:
      return {
        ...state,
        currentKitchenVisible: false,
      };
    case REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS:
      return {
        currentKitchen: action.kitchen,
        currentKitchenVisible: true,
      };
    case REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS:
      return {
        currentKitchen: action.kitchen,
        currentKitchenVisible: false,
      };
    case REQUEST_ADD_CURRENT_KITCHEN_FAILURE:
      return {
        ...state,
        currentKitchenVisible: false,
        error: action.error,
      };
    case DELETE_CURRENT_KITCHEN:
      return {
        currentKitchen: {},
        currentKitchenVisible: false,
      };
    default:
      return state;
  }
};

export default kitchen;
