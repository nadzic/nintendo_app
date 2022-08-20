import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddPaymentScreen } from 'nintendoapp/js/components/payment/AddPaymentScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<AddPaymentScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('AddPaymentScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
