import { calculateTotal, getIndexInUpcs, alreadyInProducts } from 'nintendoapp/js/utils/calculation';

const products = [{
  id: 10,
  variantId: 33,
  short: `Justin's`,
  name: 'Chocolate Peanut Butter Cup, 1.4oz',
  imageUrl: 'https://s3-us-west-1.amazonaws.com/ohmygreen/app/public/spree/products/17/small/JUSTINS_peanut_butter_cups_vegan_store_viva_shop.jpg?1393319342',
  flavor: 'Peanut Butter Sea Salt',
  price: parseFloat(5.42),
  curreny: 'usd',
  upcCode: '8995870543128',
  },
  {
    id: 11,
    variantId: 31,
    short: `Product 2`,
    name: 'Hej hej 2',
    imageUrl: 'https://s3-us-west-1.amazonaws.com/ohmygreen/app/public/spree/products/17/small/JUSTINS_peanut_butter_cups_vegan_store_viva_shop.jpg?1393319342',
    flavor: 'Peanut Butter Sea Salt',
    price: parseFloat(7.32),
    curreny: 'usd',
    upcCode: '899587003128',
    }];

describe('calculate total function', () => {

  it('testing it without products (parameter)', () => {
    expect(calculateTotal()).not.toBeUndefined();
    expect(calculateTotal()).toBe(0);
  });

  it('testing it with wrong parameters', () => {
    expect(calculateTotal('blabla')).toBe(0);
    expect(calculateTotal(20)).toBe(0);
    expect(calculateTotal('cs', 'cs')).toBe(0);
  });

  it('testing it with correct products array', () => {
    expect(calculateTotal(products)).toBe(12.74);
  });
});

describe('get index in upcs function', () => {

  const upcs = ['899587003128', '898248001572', '894455000254'];
  const upcInArray = '898248001572';
  const upcNotInArray = '444248001572';

  it('testing it without upcCode or upcs (parameters)', () => {
    expect(getIndexInUpcs()).not.toBeUndefined();
    expect(getIndexInUpcs()).toBe(0);
  });

  it('testing it with existing upcCode in upcs array', () => {
    expect(getIndexInUpcs(upcInArray, upcs)).toBe(1);
  });

  it('testing it with not existing upcCode in upcs array', () => {
    expect(getIndexInUpcs(upcNotInArray, upcs)).toBe(0);
  });

});

describe('already in products function', () => {

  it('testing it without upcCode or products (parameters)', () => {
    expect(alreadyInProducts()).not.toBeUndefined();
    expect(alreadyInProducts()).toBe(false);
  });

  it('searching for product, whose upc code is in the products array', () => {
    expect(alreadyInProducts('899587003128', products)).toBe(true);
  });

  it('searching for product, whose upc code is not in the products array', () => {
    expect(alreadyInProducts('123214243244', products)).toBe(false);
  });

});

