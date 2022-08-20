import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignupScreen } from 'nintendoapp/js/components/signup/SignupScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
  };

  const wrapper = shallow(<SignupScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('SignupScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
