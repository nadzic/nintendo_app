import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ForgotPasswordScreen } from 'nintendoapp/js/components/forgot-password/ForgotPasswordScreen';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    closeInvalidEmailFPModal: jest.fn(),
    reset: jest.fn(),
    loading: false,
    invalidEmailFPModalOpen: false,
  };

  const wrapper = shallow(<ForgotPasswordScreen {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('ForgotPasswordScreen component', () => {
  it('should renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should check if all basics elements are there', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Text')).toHaveLength(2);

    expect(wrapper.find('TextInput')).toHaveLength(1);

    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
  });

  it('should try to click reset password', () => {
    const { wrapper, props } = setup();
    const button = wrapper.find('TouchableOpacity');
    wrapper.setState({ email: '' });
    button.props().onPress();
    expect(props.reset.mock.calls.length).toBe(0);

    wrapper.setState({ email: 'ardit.vula@ohmygreen.com' });
    button.props().onPress();
    expect(props.reset.mock.calls.length).toBe(1);
  });
});
