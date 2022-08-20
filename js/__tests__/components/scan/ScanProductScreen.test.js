import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ScanProductScreen } from 'nintendoapp/js/components/scan/ScanProductScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    products: [],
  };

  const wrapper = shallow(<ScanProductScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('ScanProductScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
