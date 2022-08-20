import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'nintendoapp/js/actions/kitchenActions';
import * as types from 'nintendoapp/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('kitchen aynchronous actions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should add kiosk', () => {

    fetch.mockResponseOnce(JSON.stringify({ }));

    const user = {
      auth_token: 'auth-token-comes-here',
      email: 'ardit.vula@ohmygreen.com',
      company_name: 'Ohmygreen',
      company_id: '1',
    };

    const newUser = {
      auth_token: 'auth-token-comes-here',
      email: 'ardit.vula@ohmygreen.com',
      company_name: '',
      company_id: '',
    };

    const upc_code = '1';

    const expectedActions = [
      { type: types.REQUEST_ADD_CURRENT_KITCHEN },
      { type: types.UPDATE_USER, user: newUser },
      { type: types.REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS, kitchen: { company_name: '', company_id: '' } },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.addKitchen(user, upc_code)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
