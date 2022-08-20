import { API } from 'nintendoapp/js/constants/api';

describe('test staging constants', () => {
  it('check if the backend url is correct', () => {
    const expectedProductUrl = 'https://staging.ohmygreen.com/api';
    expect(API.BACKEND_URL).toEqual(expectedProductUrl);
  });
});

