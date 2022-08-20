import loading from 'nintendoapp/js/reducers/loadingReducer';
import * as types from 'nintendoapp/js/actions/actionTypes';

describe('loading reducer', () => {
  it('should return the initial state', () => {
    expect(loading(undefined, {})).toEqual(false);
  });

  it('should handle REQUEST_RESEND_EMAIL', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_RESEND_EMAIL,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_SIGN_UP', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_SIGN_UP,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_RESET_PASSWORD', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_RESET_PASSWORD,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_ADD_CURRENT_PRODUCT', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_LOGIN', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_ADD_CREDIT_CARD', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_GET_CREDIT_CARD', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_CREDIT_CARD,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_UPDATE_CREDIT_CARD', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_UPDATE_CREDIT_CARD,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_DELETE_CREDIT_CARD', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_DELETE_CREDIT_CARD,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_KIOSK_PURCHASE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_KIOSK_PURCHASE,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_RESEND_EMAIL_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_RESEND_EMAIL_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_SIGN_UP_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_SIGN_UP_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_SIGN_UP_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_SIGN_UP_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_RESET_PASSWORD_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_RESET_PASSWORD_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_RESET_PASSWORD_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_RESET_PASSWORD_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_ADD_CURRENT_PRODUCT_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_ADD_CURRENT_PRODUCT_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CURRENT_PRODUCT_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle DELETE_CURRENT_PRODUCT', () => {
    expect(loading(
      undefined,
      {
        type: types.DELETE_CURRENT_PRODUCT,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_LOGIN_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_LOGIN_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_ADD_CREDIT_CARD_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_ADD_CREDIT_CARD_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_ADD_CREDIT_CARD_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_CREDIT_CARD_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_CREDIT_CARD_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_CREDIT_CARD_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_CREDIT_CARD_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_UPDATE_CREDIT_CARD_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_UPDATE_CREDIT_CARD_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_UPDATE_CREDIT_CARD_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_UPDATE_CREDIT_CARD_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_DELETE_CREDIT_CARD_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_DELETE_CREDIT_CARD_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_DELETE_CREDIT_CARD_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_DELETE_CREDIT_CARD_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_KIOSK_PURCHASE_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_KIOSK_PURCHASE_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_KIOSK_PURCHASE_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_KIOSK_PURCHASE_FAILURE,
      },
    )).toEqual(false);
  });
});
