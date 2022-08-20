import cart, { upcs, variants, products, quantities } from 'nintendoapp/js/reducers/cartReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('cart reducer (combined/main)', () => {
  it('should return the initial state', () => {
    expect(cart(undefined, {})).toEqual({
      products: [],
      quantities: [],
      upcs: [],
      variants: [],
    });
  });
});

describe('upcs cart sub-reducer', () => {

  it('should return the initial state', () => {
    expect(upcs(undefined, {})).toEqual([]);
  });

  it('should handle ADD_UPC_TO_CART', () => {
    expect(upcs([], {
      type: types.ADD_UPC_TO_CART,
      upcCode: '899587003128',
    })).toEqual([
      '899587003128',
    ]);
    expect(upcs(
      ['899587003128', '898248001572'],
      {
        type: types.ADD_UPC_TO_CART,
        upcCode: '894455000254',
      },
    )).toEqual(['899587003128', '898248001572', '894455000254']);
  });

  it('should handle DELETE_UPC_FROM_CART', () => {
    expect(upcs(
      ['899587003128', '898248001572', '894455000254'],
      {
        type: types.DELETE_UPC_FROM_CART,
        id: 1,
      },
    )).toEqual(['899587003128', '894455000254']);
  });

  it('should handle DELETE_ALL_UPCS_FROM_CART', () => {
    expect(upcs(
      ['899587003128', '898248001572', '894455000254'],
      {
        type: types.DELETE_ALL_UPCS_FROM_CART,
      },
    )).toEqual([]);
  });
});

describe('variants cart sub-reducer', () => {
  it('should return the initial state', () => {
    expect(variants(undefined, {})).toEqual([]);
  });

  it('should handle ADD_VARIANT_TO_CART', () => {
    expect(variants([], {
      type: types.ADD_VARIANT_TO_CART,
      variantId: 2710,
    })).toEqual([
      2710,
    ]);
    expect(variants(
      [2710, 4897],
      {
        type: types.ADD_VARIANT_TO_CART,
        variantId: 33,
      },
    )).toEqual([2710, 4897, 33]);
  });

  it('should handle DELETE_VARIANT_FROM_CART', () => {
    expect(variants(
      [2710, 4897, 33],
      {
        type: types.DELETE_VARIANT_FROM_CART,
        id: 1,
      },
    )).toEqual([2710, 33]);
  });

  it('should handle DELETE_ALL_VARIANTS_FROM_CART', () => {
    expect(variants(
      [2710, 4897, 33],
      {
        type: types.DELETE_ALL_VARIANTS_FROM_CART,
      },
    )).toEqual([]);
  });
});

describe('products cart sub-reducer', () => {

  const product = {
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
    expect(products(undefined, {})).toEqual([]);
  });

  it('should handle ADD_PRODUCT_TO_CART', () => {
    expect(products(
      [],
      {
        type: types.ADD_PRODUCT_TO_CART,
        product,
      },
    )).toEqual([product]);
  });

  it('should handle DELETE_PRODUCT_FROM_CART', () => {
    expect(products(
      [product],
      {
        type: types.DELETE_PRODUCT_FROM_CART,
        id: 10,
      },
    )).toEqual([]);
  });

  it('should handle DELETE_ALL_PRODUCTS_FROM_CART', () => {
    expect(products(
      [product],
      {
        type: types.DELETE_ALL_PRODUCTS_FROM_CART,
        product,
      },
    )).toEqual([]);
  });
});

describe('quantities cart sub-reducer', () => {
  it('should return the initial state', () => {
    expect(quantities(undefined, {})).toEqual([]);
  });

  it('should handle ADD_QUANTITY_TO_CART', () => {
    expect(quantities([], {
      type: types.ADD_QUANTITY_TO_CART,
    })).toEqual([
      1,
    ]);
    expect(quantities(
      [2, 6],
      {
        type: types.ADD_QUANTITY_TO_CART,
      },
    )).toEqual([2, 6, 1]);
  });

  it('should handle INCREASE_QUANTITY_IN_CART', () => {
    expect(quantities(
      [2, 4],
      {
        type: types.INCREASE_QUANTITY_IN_CART,
        id: 1,
      },
    )).toEqual([2, 5]);
  });

  it('should handle DECREASE_QUANTITY_IN_CART', () => {
    expect(quantities(
      [2, 4],
      {
        type: types.DECREASE_QUANTITY_IN_CART,
        id: 1,
      },
    )).toEqual([2, 3]);
  });

  it('should handle DELETE_QUANTITY_FROM_CART', () => {
    expect(quantities(
      [2, 4, 5, 3],
      {
        type: types.DELETE_QUANTITY_FROM_CART,
        id: 2,
      },
    )).toEqual([2, 4, 3]);
  });

  it('should handle DELETE_ALL_QUANTITIES_FROM_CART', () => {
    expect(quantities(
      [2, 4, 5, 3],
      {
        type: types.DELETE_ALL_QUANTITIES_FROM_CART,
      },
    )).toEqual([]);
  });
});
