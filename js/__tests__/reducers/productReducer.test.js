import product from 'nintendoapp/js/reducers/productReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('(current) product reducer', () => {

  const currentProduct = {
    id: 10,
    variantId: 33,
    short: `Justin's`,
    name: 'Chocolate Peanut Butter Cup, 1.4oz',
    imageUrl: 'https://s3-us-west-1.amazonaws.com/ohmygreen/app/public/spree/products/17/small/JUSTINS_peanut_butter_cups_vegan_store_viva_shop.jpg?1393319342',
    flavor: 'Peanut Butter Sea Salt',
    price: parseFloat(10.2),
    curreny: 'usd',
    upcCode: '899587003128',
    price: {
      amount: '1.99',
      available: true,
      currency: 'USD',
      deleted_at: null,
      id: 33,
      stock_location_id: 1,
      variant_id: 33,
    },
  };

  it('should return the initial state', () => {
    expect(product(undefined, {})).toEqual({ currentProductVisible: false });
  });

  it('should handle REQUEST_ADD_CURRENT_PRODUCT', () => {

    expect(product(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT,
        product: currentProduct,
      },
    )).toEqual({ currentProduct, currentProductVisible: false });
  });

  it('should handle REQUEST_ADD_CURRENT_PRODUCT_SUCCESS', () => {

    expect(product(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT_SUCCESS,
        product: currentProduct,
      },
    )).toEqual({ currentProduct, currentProductVisible: true });
  });


  it('should handle REQUEST_ADD_CURRENT_PRODUCT_FAILURE', () => {

    expect(product(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT_FAILURE,
        error: 'Failure to add currect product',
      },
    )).toEqual({ currentProduct: {}, currentProductVisible: false, error: 'Failure to add currect product' });
  });

  it('should handle DELETE_CURRENT_PRODUCT', () => {

    expect(product(
      undefined,
      {
        type: types.DELETE_CURRENT_PRODUCT,
      },
    )).toEqual({ currentProduct: {}, currentProductVisible: false });
  });
});
