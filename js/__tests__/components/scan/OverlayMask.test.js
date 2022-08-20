import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OverlayMask from 'nintendoapp/js/components/scan/OverlayMask';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<OverlayMask {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('OverlayMask component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
