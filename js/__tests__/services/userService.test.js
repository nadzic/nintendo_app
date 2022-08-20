import { userService } from 'nintendoapp/js/services/userService';

jest.mock('nintendoapp/js/api/fetchData');
// The assertion for a promise must be returned.

describe('user service', () => {
  it('resend with existing email', () => {
    expect.assertions(1);
    return userService.resend('ardit.vula@ohmygreen.com').then(data => expect(data).toEqual({ message: 'Password resend successfully' }));
  });
});

