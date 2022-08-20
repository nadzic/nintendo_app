import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PaymentCompleteScreen } from 'nintendoapp/js/components/payment/PaymentCompleteScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<PaymentCompleteScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('PaymentCompleteScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
