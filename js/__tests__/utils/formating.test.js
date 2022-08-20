import { formatTextWithRegex, ltrim0 } from 'nintendoapp/js/utils/formating';

describe('handle input with regex function', () => {

  it('testing it without text, delimeter, regex (parameters)', () => {
    expect(formatTextWithRegex()).not.toBeUndefined();
    expect(formatTextWithRegex()).toBeFalsy();
    expect(formatTextWithRegex()).toBe('');
  });

  it('testing it with credit card example', () => {
    expect(formatTextWithRegex('1234123412341234', ' ', '.{1,4}')).toBe('1234 1234 1234 1234');
  });

  it('testing it with date example', () => {
    expect(formatTextWithRegex('0612', '/', '.{1,2}')).toBe('06/12');
  });
});

describe('handle left trim zeros function', () => {

  it('testing it without text', () => {
    expect(ltrim0()).not.toBeUndefined();
    expect(ltrim0()).toBeFalsy();
    expect(ltrim0()).toBe('');
  });

  it('testing it with one 0 upfront', () => {
    expect(ltrim0('0602652170119')).toBe('602652170119');
  });

  it('testing it with three 0s upfront', () => {
    expect(ltrim0('00060265217011')).toBe('60265217011');
  });

  it('testing it without 0 upfront', () => {
    expect(ltrim0('1114445556667')).toBe('1114445556667');
  });
});
