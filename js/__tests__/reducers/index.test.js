import nintendoApp from 'nintendoapp/js/reducers/index';

describe('nintendoApp (root) reducer', () => {

  const initialRootState = {
    auth: {},
    cart: {
      products: [], quantities: [], upcs: [], variants: [],
    },
    creditCard: {},
    loading: false,
    product: { currentProductVisible: false },
    signup: {},
    ui: {
      addPaymentProblemModalOpen: false,
      deletePaymentProblemModalOpen: false,
      emailTakenModalOpen: false,
      goToAddPaymentContentVisible: false,
      invalidCredentialsModalOpen: false,
      invalidEmailFPModalOpen: false,
      processingPaymentProblemModalOpen: false,
      removeCardModalOpen: false,
      resendEmailModalOpen: false,
      resetPasswordModalOpen: false,
      scanProductProblemModalOpen: false,
      scanProductNoRecordModalOpen: false,
      scanKitchenProblemModalOpen: false,
      scanKitchenNoRecordModalOpen: false,
      thankYouSignupContentVisible: false,
      updatePaymentProblemModalOpen: false,
    },
  };


  it('should return the initial state', () => {
    expect(nintendoApp(undefined, {})).toMatchObject(initialRootState);
  });
});

