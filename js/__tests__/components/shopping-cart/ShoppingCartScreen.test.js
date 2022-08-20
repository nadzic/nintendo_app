import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ShoppingCartScreen } from 'nintendoapp/js/components/shopping-cart/ShoppingCartScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<ShoppingCartScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('ShoppingCartScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
