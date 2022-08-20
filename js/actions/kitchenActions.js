import { get as safeGet } from 'lodash';
import {
  REQUEST_ADD_CURRENT_KITCHEN,
  REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS,
  REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS,
  REQUEST_ADD_CURRENT_KITCHEN_FAILURE,
} from 'nintendoapp/js/actions/actionTypes';
import { purchaseService } from 'nintendoapp/js/services/purchaseService';
import {
  openScanKitchenProblemModal,
  openScanKitchenNoRecordModal,
} from 'nintendoapp/js/actions/uiActions';
import { logout, updateUser } from 'nintendoapp/js/actions/userActions';
import { resetAndGoToLogin } from 'nintendoapp/js/actions/navigationActions';

export const addKitchen = (user, upc_code) => {
  const { auth_token } = user;
  return dispatch => {
    dispatch(requestAddCurrentKitchen());
    return purchaseService.scanKitchen(auth_token, upc_code)
      .then(
        data => {
          const kitchen = {
            company_name: safeGet(data, 'company_name', ''),
            company_id: safeGet(data, 'company_id', ''),
          };

          const newUser = {
            auth_token,
            email: user.email,
            company_name: kitchen.company_name,
            company_id: kitchen.company_id,
          };
          dispatch(updateUser(newUser));

          dispatch(successAddCurrentKitchenVisible(kitchen));
          setTimeout(() => {
            dispatch(successAddCurrentKitchenInvisible(kitchen));
          }, 3000);
        },
        errorCode => {
          if (errorCode === 404 || errorCode === 500) {
            dispatch(openScanKitchenNoRecordModal());
          } else if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openScanKitchenProblemModal());
          }
          dispatch(failureAddCurrentKitchen());
        },
      );
  };

  function requestAddCurrentKitchen() {
    return { type: REQUEST_ADD_CURRENT_KITCHEN };
  }
  function successAddCurrentKitchenVisible(kitchen) {
    return { type: REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS, kitchen };
  }
  function successAddCurrentKitchenInvisible(kitchen) {
    return { type: REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS, kitchen };
  }
  function failureAddCurrentKitchen() {
    return { type: REQUEST_ADD_CURRENT_KITCHEN_FAILURE };
  }
};
