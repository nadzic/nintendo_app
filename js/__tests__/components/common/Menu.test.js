import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Menu } from 'nintendoapp/js/components/common/Menu';

Enzyme.configure({ adapter: new Adapter() });

const user = {
  email: 'ardit.vula@ohmygreen.com',
  auth_token: 'token',
};

describe('Menu component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Menu user={user} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('check the texts', () => {
    const wrapper = shallow(<Menu user={user} />);
    expect(wrapper.find('Text')).toHaveLength(8);
  });
});
