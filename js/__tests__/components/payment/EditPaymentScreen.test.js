import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditPaymentScreen } from 'nintendoapp/js/components/payment/EditPaymentScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<EditPaymentScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('EditPaymentScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
