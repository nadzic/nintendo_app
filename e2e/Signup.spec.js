describe('Signup - visible basic elements', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Create an Account')).tap();
  });

  it('All basic elements should be visible', async () => {
    await expect(element(by.text('First Name')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Last Name')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Email')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Password')).atIndex(0)).toBeVisible();
  });
})

describe('Signup - flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Create an Account')).tap();
  });

  it('Should try to signup without any inserted data in input fields', async () => {
    await element(by.id('Signup Button Signup')).tap();
    await expect(element(by.text('Please enter your first name.'))).toBeVisible();
    await expect(element(by.text('Please enter your last name.'))).toBeVisible();
    await expect(element(by.text('Please enter a valid email address.'))).toBeVisible();
    await expect(element(by.text('Minimum 6 characters long with at least one letter and one number.'))).toBeVisible();
  });

  it('Should succesfully create an account', async () => {
    const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    await element(by.id('First Name Input Signup')).tap();
    await element(by.id('First Name Input Signup')).typeText('Bambooo');
    await element(by.id('Last Name Input Signup')).tap();
    await element(by.id('Last Name Input Signup')).typeText('Knex\n');
    await element(by.id('Email Input Signup')).tap();
    await element(by.id('Email Input Signup')).typeText(`${randomString}@gmail.com\n`);
    await element(by.id('Password Input Signup')).tap();
    await element(by.id('Password Input Signup')).typeText('Test123\n');
    await waitFor(element(by.id('Signup Button Signup'))).toBeVisible().withTimeout(2000);
    await element(by.id('Signup Button Signup')).tap();
    await waitFor(element(by.text('THANK YOU FOR SIGNING UP!'))).toBeVisible().withTimeout(3000);
  });

  it('Should succesfully create an account and resend email', async () => {
    const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    await element(by.id('First Name Input Signup')).tap();
    await element(by.id('First Name Input Signup')).typeText('Bambooo');
    await element(by.id('Last Name Input Signup')).tap();
    await element(by.id('Last Name Input Signup')).typeText('Knex\n');
    await element(by.id('Email Input Signup')).tap();
    await element(by.id('Email Input Signup')).typeText(`${randomString}@gmail.com\n`);
    await element(by.id('Password Input Signup')).tap();
    await element(by.id('Password Input Signup')).typeText('Test123\n');
    await waitFor(element(by.id('Signup Button Signup'))).toBeVisible().withTimeout(2000);
    await element(by.id('Signup Button Signup')).tap();
    await waitFor(element(by.text('THANK YOU FOR SIGNING UP!'))).toBeVisible().withTimeout(3000);
    await element(by.text('Resend Email')).tap();
    await waitFor(element(by.text(`Email Has Been Resent To ${randomString}@gmail.com.`))).toBeVisible().withTimeout(3000);
    await element(by.text('OK')).tap();
  });
})