import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'nintendoapp/js/actions/cartActions';
import * as types from 'nintendoapp/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cart aynchronous actions', () => {
  it('should delete product from cart', () => {
    const expectedAction = {
      type: types.DELETE_PRODUCT_FROM_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.deleteProductFromCart(1)).toEqual(expectedAction);
  });

  it('should delete all products from cart', () => {
    const expectedAction = {
      type: types.DELETE_ALL_PRODUCTS_FROM_CART,
    };
    expect(actions.deleteAllProductsFromCart()).toEqual(expectedAction);
  });

  it('should add variant to cart', () => {
    const expectedAction = {
      type: types.ADD_VARIANT_TO_CART,
      variantId: 2710,
    };
    expect(actions.addVariantToCart(2710)).toEqual(expectedAction);
  });

  it('should delete variant from cart', () => {
    const expectedAction = {
      type: types.DELETE_VARIANT_FROM_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.deleteVariantFromCart(1)).toEqual(expectedAction);
  });

  it('should delete all variants from cart', () => {
    const expectedAction = {
      type: types.DELETE_ALL_VARIANTS_FROM_CART,
    };
    expect(actions.deleteAllVariantsFromCart()).toEqual(expectedAction);
  });

  it('should add upc code to cart', () => {
    const expectedAction = {
      type: types.ADD_UPC_TO_CART,
      upcCode: '899587003128',
    };
    expect(actions.addUpcToCart('899587003128')).toEqual(expectedAction);
  });

  it('should delete upc code from cart', () => {
    const expectedAction = {
      type: types.DELETE_UPC_FROM_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.deleteUpcFromCart(1)).toEqual(expectedAction);
  });

  it('should delete all upcs from cart', () => {
    const expectedAction = {
      type: types.DELETE_ALL_UPCS_FROM_CART,
    };
    expect(actions.deleteAllUpcsFromCart()).toEqual(expectedAction);
  });

  it('should add quantity to cart', () => {
    const expectedAction = {
      type: types.ADD_QUANTITY_TO_CART,
    };
    expect(actions.addQuantityToCart()).toEqual(expectedAction);
  });

  it('should icnrease quantity in cart', () => {
    const expectedAction = {
      type: types.INCREASE_QUANTITY_IN_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.increaseQuantityInCart(1)).toEqual(expectedAction);
  });

  it('should decrease quantity in cart', () => {
    const expectedAction = {
      type: types.DECREASE_QUANTITY_IN_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.decreaseQuantityInCart(1)).toEqual(expectedAction);
  });

  it('should delete quantity from cart', () => {
    const expectedAction = {
      type: types.DELETE_QUANTITY_FROM_CART,
      id: 1,
    };
    // id in the array (which in sequence)
    expect(actions.deleteQuantityFromCart(1)).toEqual(expectedAction);
  });

  it('should delete all quantities from cart', () => {
    const expectedAction = {
      type: types.DELETE_ALL_QUANTITIES_FROM_CART,
    };
    // id in the array (which in sequence)
    expect(actions.deleteAllQuantitiesFromCart()).toEqual(expectedAction);
  });
});

describe('cart aynchronous actions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should make kiosk purchase successfully', () => {

    fetch.mockResponseOnce(JSON.stringify({ }));

    const variants = [2710, 4897, 33];
    const quantities = [2, 6, 1];
    const auth_token = 'auth-token-comes-here';

    const expectedActions = [
      { type: types.REQUEST_KIOSK_PURCHASE },
      { type: types.REQUEST_KIOSK_PURCHASE_SUCCESS },
      { type: types.GO_TO_PAYMENT_COMPLETE },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.makeKioskPurchase(auth_token, variants, quantities)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should add product to the cart', () => {

    const auth_token = 'auth-token-comes-here';
    const upc_code = '12312312312';
    const company_id = 519;
    const productId = 0;
    const isInCartAlready = false;
    const indexInCart = 0;

    fetch.mockResponseOnce(JSON.stringify({
      id: productId,
      variantId: 324,
      short: 'SHO',
      name: 'cookie',
      imageUrl: '',
      flavor: '',
      price: parseFloat(32.2),
      curreny: '',
      upcCode: upc_code,
    }));

    const expectedActions = [
      { product: { productId: 0 }, type: types.REQUEST_ADD_CURRENT_PRODUCT },
      {
        product: {
          curreny: undefined,
          flavor: '',
          id: 0,
          imageUrl: undefined,
          name: 'cookie',
          price: 32.2,
          short: undefined,
          upcCode: '12312312312',
          variantId: 0,
        },
        type: types.REQUEST_ADD_CURRENT_PRODUCT_SUCCESS,
      },
      {
        product: {
          curreny: undefined,
          flavor: '',
          id: 0,
          imageUrl: undefined,
          name: 'cookie',
          price: 32.2,
          short: undefined,
          upcCode: '12312312312',
          variantId: 0,
        },
        type: types.ADD_PRODUCT_TO_CART,
      },
      {
        type: types.ADD_VARIANT_TO_CART,
        variantId: 0,
      },
      {
        type: types.ADD_UPC_TO_CART,
        upcCode: '12312312312',
      }, {
        type: types.ADD_QUANTITY_TO_CART,
      }];

    const store = mockStore({ });

    return store.dispatch(actions.addProduct(
      auth_token,
      upc_code,
      company_id,
      productId,
      isInCartAlready,
      indexInCart,
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
