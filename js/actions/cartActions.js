import {
  REQUEST_ADD_CURRENT_PRODUCT,
  REQUEST_ADD_CURRENT_PRODUCT_SUCCESS,
  REQUEST_ADD_CURRENT_PRODUCT_FAILURE,
  DELETE_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  DELETE_ALL_PRODUCTS_FROM_CART,
  ADD_VARIANT_TO_CART,
  DELETE_VARIANT_FROM_CART,
  DELETE_ALL_VARIANTS_FROM_CART,
  ADD_QUANTITY_TO_CART,
  INCREASE_QUANTITY_IN_CART,
  DECREASE_QUANTITY_IN_CART,
  DELETE_QUANTITY_FROM_CART,
  DELETE_ALL_QUANTITIES_FROM_CART,
  REQUEST_KIOSK_PURCHASE,
  REQUEST_KIOSK_PURCHASE_SUCCESS,
  REQUEST_KIOSK_PURCHASE_FAILURE,
  ADD_UPC_TO_CART,
  DELETE_UPC_FROM_CART,
  DELETE_ALL_UPCS_FROM_CART,
} from 'nintendoapp/js/actions/actionTypes';
import { productService } from 'nintendoapp/js/services/productService';
import { purchaseService } from 'nintendoapp/js/services/purchaseService';
import {
  openScanProductProblemModal,
  openScanProductNoRecordModal,
  openProcessingPaymentProblemModal,
} from 'nintendoapp/js/actions/uiActions';
import { logout } from 'nintendoapp/js/actions/userActions';
import {
  goToPaymentComplete,
  resetAndGoToLogin
} from 'nintendoapp/js/actions/navigationActions';

export const deleteProductFromCart = id => ({
  type: DELETE_PRODUCT_FROM_CART,
  id,
});

export const deleteAllProductsFromCart = () => ({
  type: DELETE_ALL_PRODUCTS_FROM_CART,
});

export const addVariantToCart = variantId => ({
  type: ADD_VARIANT_TO_CART,
  variantId,
});

export const deleteVariantFromCart = id => ({
  type: DELETE_VARIANT_FROM_CART,
  id,
});

export const deleteAllVariantsFromCart = () => ({
  type: DELETE_ALL_VARIANTS_FROM_CART,
});

export const addUpcToCart = upcCode => ({
  type: ADD_UPC_TO_CART,
  upcCode,
});

export const deleteUpcFromCart = id => ({
  type: DELETE_UPC_FROM_CART,
  id,
});

export const deleteAllUpcsFromCart = () => ({
  type: DELETE_ALL_UPCS_FROM_CART,
});

export const addQuantityToCart = () => ({
  type: ADD_QUANTITY_TO_CART,
});

export const increaseQuantityInCart = id => ({
  type: INCREASE_QUANTITY_IN_CART,
  id,
});

export const decreaseQuantityInCart = id => ({
  type: DECREASE_QUANTITY_IN_CART,
  id,
});

export const deleteQuantityFromCart = id => ({
  type: DELETE_QUANTITY_FROM_CART,
  id,
});

export const deleteAllQuantitiesFromCart = () => ({
  type: DELETE_ALL_QUANTITIES_FROM_CART,
});

export const makeKioskPurchase = (auth_token, variants, quantities) => {
  return dispatch => {
    dispatch(request());
    return purchaseService.makeKioskPurchase(auth_token, variants, quantities)
      .then(
        data => {
          dispatch(success());
          dispatch(goToPaymentComplete());
        },
        errorCode => {
          if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openProcessingPaymentProblemModal());
          }
          dispatch(failure());
        },
      );
  };

  function request() { return { type: REQUEST_KIOSK_PURCHASE }; }
  function success() { return { type: REQUEST_KIOSK_PURCHASE_SUCCESS }; }
  function failure() { return { type: REQUEST_KIOSK_PURCHASE_FAILURE }; }
};

export const addProduct = (auth_token, upc_code, company_id, productId, isInCartAlready, indexInCart) => {
  return dispatch => {
    dispatch(requestAddCurrentProduct({ productId }));
    return productService.scanProduct(auth_token, upc_code, company_id)
      .then(
        data => {
          const product = {
            id: productId,
            variantId: data.id,
            short: data.brand_name,
            name: data.name,
            imageUrl: data.image_url,
            flavor: data.flavor,
            price: parseFloat(data.price),
            curreny: data.currency,
            upcCode: upc_code,
          };

          dispatch(successAddCurrentProduct(product));
          dispatch(addProductToCart(product));
          setTimeout(() => {
            dispatch(deleteCurrentProduct());
          }, 3000);

          if (!isInCartAlready) {
            dispatch(addVariantToCart(product.variantId));
            dispatch(addUpcToCart(upc_code));
            dispatch(addQuantityToCart());
          } else {
            dispatch(increaseQuantityInCart(indexInCart));
          }
        },
        errorCode => {
          if (errorCode === 404 || errorCode === 400) {
            dispatch(openScanProductNoRecordModal());
          } else if (errorCode === 401) {
            dispatch(logout());
            dispatch(resetAndGoToLogin());
          } else {
            dispatch(openScanProductProblemModal());
          }
          dispatch(failureAddCurrentProduct());
        },
      );
  };

  function addProductToCart(product) {
    return { type: ADD_PRODUCT_TO_CART, product };
  }
  function requestAddCurrentProduct(product) {
    return { type: REQUEST_ADD_CURRENT_PRODUCT, product };
  }
  function successAddCurrentProduct(product) {
    return { type: REQUEST_ADD_CURRENT_PRODUCT_SUCCESS, product };
  }
  function failureAddCurrentProduct(error) {
    return { type: REQUEST_ADD_CURRENT_PRODUCT_FAILURE, error };
  }
  function deleteCurrentProduct() {
    return { type: DELETE_CURRENT_PRODUCT };
  }
};
