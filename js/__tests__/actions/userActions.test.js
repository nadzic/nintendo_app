import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'nintendoapp/js/actions/userActions';
import * as types from 'nintendoapp/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const first_name = 'Ardit';
const last_name = 'Vula';
const email = 'ardit.vula@ohmygreen.com';
const password = 'pass123';

const user = {
  email: 'ardit.vula@ohmygreen.com',
  auth_token: 'token_example_which_comes_from_backend',
  company_name: 'Twitch - 8th',
  company_id: 2,
};

const kitchen = {
  company_name: 'Twitch - 8th',
  company_id: 2,
};

describe('user aynchronous actions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should log in (user logs in)', () => {

    fetch.mockResponseOnce(JSON.stringify(user));

    const expectedActions = [
      { type: types.REQUEST_LOGIN },
      { type: types.REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS, kitchen },
      { type: types.REQUEST_LOGIN_SUCCESS, user },
      { type: types.GO_TO_SCAN_PRODUCT },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.login(
      email,
      password,
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should logout', () => {

    fetch.mockResponseOnce({ });

    const expectedActions = [
      { type: types.REQUEST_LOGOUT },
      { type: types.DELETE_CURRENT_KITCHEN },
      { type: types.RESET_AND_GO_TO_LOGIN }
    ];
    const store = mockStore({ });

    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should resend password (user log in)', () => {

    fetch.mockResponseOnce(JSON.stringify({ }));

    const expectedActions = [
      { type: types.REQUEST_RESEND_EMAIL },
      { type: types.REQUEST_RESEND_EMAIL_SUCCESS },
      { type: types.OPEN_RESEND_EMAIL_MODAL },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.resend(email)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should register (user registers)', () => {

    fetch.mockResponseOnce(JSON.stringify(user));

    const expectedActions = [
      { type: types.REQUEST_SIGN_UP },
      { type: types.REQUEST_SIGN_UP_SUCCESS, user },
      { type: types.SHOW_THANK_YOU_SIGNUP_CONTENT },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.register(first_name, last_name, email, password)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

