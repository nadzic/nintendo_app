import creditCard from 'nintendoapp/js/reducers/creditCardReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('creditCard reducer', () => {
  it('should return the initial state', () => {
    expect(creditCard(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_ADD_CREDIT_CARD', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_ADD_CREDIT_CARD_FAILURE', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD_FAILURE,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_DELETE_CREDIT_CARD_SUCCESS', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_DELETE_CREDIT_CARD_SUCCESS,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_DELETE_CREDIT_CARD_FAILURE', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_DELETE_CREDIT_CARD_FAILURE,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_GET_CREDIT_CARD', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_GET_CREDIT_CARD,
      },
    )).toEqual({});
  });

  const customer = {
    account_balance: 0,
    created: 1528397983,
    currency: null,
    default_source: 'card_1CaTKlGXJPajVStYWCQEPA03',
    delinquent: false,
    description: null,
    discount: null,
    email: 'ardit.vula@ohmygreen.com',
    id: 'cus_D0UJCWAHTjOtou',
    invoice_prefix: '04E48D7',
    livemode: false,
    metadata: {},
    object: 'customer',
    shipping: null,
    sources: {
      data: [],
      has_more: false,
      object: 'list',
      total_count: 1,
      url: '/v1/customers/cus_D0UJCWAHTjOtou/sources',
    },
    subscriptions: {
      object: 'list', data: [], has_more: false, total_count: 0, url: '/v1/customers/cus_D0UJCWAHTjOtou/subscriptions'
    },
  };

  it('should handle REQUEST_ADD_CREDIT_CARD_SUCCESS', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD_SUCCESS,
        customer,
      },
    )).toEqual({ customer });
  });

  it('should handle REQUEST_UPDATE_CREDIT_CARD_SUCCESS', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_UPDATE_CREDIT_CARD_SUCCESS,
        customer,
      },
    )).toEqual({ customer });
  });

  it('should handle REQUEST_GET_CREDIT_CARD_SUCCESS', () => {
    expect(creditCard(
      undefined,
      {
        type: types.REQUEST_GET_CREDIT_CARD_SUCCESS,
        customer,
      },
    )).toEqual({ customer });
  });
});

