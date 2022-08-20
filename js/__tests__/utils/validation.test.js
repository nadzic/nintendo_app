import { validateEmail, validatePassword } from 'nintendoapp/js/utils/validation';

describe('validate email function', () => {

  it('testing it without email (parameter)', () => {
    expect(validateEmail()).not.toBeUndefined();
    expect(validateEmail()).toBeFalsy();
  });

  it('testing it with wrong email addresses', () => {
    expect(validateEmail('blabla')).toBe(false);
    expect(validateEmail('blabla@ssss')).toBe(false);
    expect(validateEmail('blabla&ssss.com')).toBe(false);
  });

  it('testing it with correct email', () => {
    expect(validateEmail('test@test.com')).toBe(true);
    expect(validateEmail('ardit.vula@ohmygreen.com')).toBe(true);
  });
});

describe('validate password function', () => {

  it('testing it without password (parameter)', () => {
    expect(validatePassword()).not.toBeUndefined();
    expect(validatePassword()).toBeFalsy();
  });

  it('testing it with less then 6 characters', () => {
    expect(validatePassword('Blaca')).toBe(false);
    expect(validatePassword('123ax')).toBe(false);
    expect(validatePassword('Xtf21')).toBe(false);
    expect(validatePassword('hehea')).toBe(false);
  });

  it('testing it without number', () => {
    expect(validatePassword('Blacwedwedwa')).toBe(false);
    expect(validatePassword('wedwedax')).toBe(false);
  });

  it('testing it without letter', () => {
    expect(validatePassword('123456')).toBe(false);
    expect(validatePassword('987654321')).toBe(false);
  });

  it('testing it with correct passwords', () => {
    expect(validatePassword('abc123')).toBe(true);
    expect(validatePassword('asdfx666')).toBe(true);
  });

  it('testing it with correct passwords and additional special characters', () => {
    expect(validatePassword('abc123@asd')).toBe(true);
    expect(validatePassword('asdfx666\[]')).toBe(true);
    expect(validatePassword('asdfx666#$%&')).toBe(true);
    expect(validatePassword('asdfx666:;<=>?')).toBe(true);
    expect(validatePassword('asdfx666{|}~')).toBe(true);
    expect(validatePassword('asdfx666^$%&')).toBe(true);
  });
});
