import kitchen from 'nintendoapp/js/reducers/kitchenReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('(current) kitchen reducer', () => {

  const currentKitchen = {
    company_id: '500',
    company_name: 'Asurion',
  };

  it('should return the initial state', () => {
    expect(kitchen(undefined, {})).toEqual({ currentKitchenVisible: false });
  });

  it('should handle REQUEST_ADD_CURRENT_KITCHEN', () => {

    expect(kitchen(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_KITCHEN,
      },
    )).toEqual({ currentKitchenVisible: false });
  });

  it('should handle REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS', () => {

    expect(kitchen(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_KITCHEN_VISIBLE_SUCCESS,
        kitchen: currentKitchen,
      },
    )).toEqual({ currentKitchen, currentKitchenVisible: true });
  });

  it('should handle REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS', () => {

    expect(kitchen(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_KITCHEN_INVISIBLE_SUCCESS,
        kitchen: currentKitchen,
      },
    )).toEqual({ currentKitchen, currentKitchenVisible: false });
  });


  it('should handle REQUEST_ADD_CURRENT_KITCHEN_FAILURE', () => {

    expect(kitchen(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_KITCHEN_FAILURE,
        error: 'Failure to add currect kitchen',
      },
    )).toEqual({ currentKitchenVisible: false, error: 'Failure to add currect kitchen' });
  });

  it('should handle DELETE_CURRENT_KITCHEN', () => {

    expect(kitchen(
      undefined,
      {
        type: types.DELETE_CURRENT_KITCHEN,
      },
    )).toEqual({ currentKitchen: {}, currentKitchenVisible: false });
  });
});
