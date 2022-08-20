import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PaymentScreen } from 'nintendoapp/js/components/payment/PaymentScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    getCreditCard: jest.fn(),
  };

  const wrapper = shallow(<PaymentScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('PaymentScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
