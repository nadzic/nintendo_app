import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'nintendoapp/js/actions/paymentActions';
import * as types from 'nintendoapp/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const auth_token = 'auth-token-comes-here';
const number = '1111 4444 4444 5555';
const exp_month = '03';
const exp_year = '2020';
const cvc = '133';
const address_zip = '8053';

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

describe('payment aynchronous actions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should add credit card (user should add it)', () => {

    fetch.mockResponseOnce(JSON.stringify({
      customer,
    }));

    const expectedActions = [
      { type: types.REQUEST_ADD_CREDIT_CARD },
      { type: types.REQUEST_ADD_CREDIT_CARD_SUCCESS, customer },
      { type: types.GO_BACK },
      { type: types.HIDE_GO_TO_ADD_PAYMENT_CONTENT },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.addCreditCard(
      auth_token,
      number,
      exp_month,
      exp_year,
      cvc,
      address_zip,
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get credit card (user should get it)', () => {

    fetch.mockResponseOnce(JSON.stringify({
      customer,
    }));

    const auth_token = 'auth-token-comes-here';

    const expectedActions = [
      { type: types.REQUEST_GET_CREDIT_CARD },
      { type: types.REQUEST_GET_CREDIT_CARD_SUCCESS, customer },
      { type: types.HIDE_GO_TO_ADD_PAYMENT_CONTENT },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.getCreditCard(auth_token)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should update credit card (user should get it)', () => {

    fetch.mockResponseOnce(JSON.stringify({
      customer,
    }));

    const expectedActions = [
      { type: types.REQUEST_UPDATE_CREDIT_CARD },
      { type: types.REQUEST_UPDATE_CREDIT_CARD_SUCCESS, customer },
      { type: types.GO_BACK },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.updateCreditCard(auth_token, exp_month, exp_year, address_zip)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should delete credit card (user should get it)', () => {

    fetch.mockResponseOnce(JSON.stringify({ }));

    const auth_token = 'auth-token-comes-here';

    const expectedActions = [
      { type: types.REQUEST_DELETE_CREDIT_CARD },
      { type: types.CLOSE_REMOVE_CARD_MODAL },
      { type: types.REQUEST_DELETE_CREDIT_CARD_SUCCESS },
      { type: types.SHOW_GO_TO_ADD_PAYMENT_CONTENT },
      { type: types.GO_BACK },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.deleteCreditCard(auth_token)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
