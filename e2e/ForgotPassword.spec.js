describe('Forgot Password - visible basic elements', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Forgot Password?')).tap();
  });

  it('All basic elements should be visible', async () => {
    await expect(element(by.text('Forgot Password'))).toBeVisible();
    await expect(element(by.text('Enter your email address and further instructions will be sent there.'))).toBeVisible();
    await expect(element(by.id('Email Input Forgot Password'))).toBeVisible();
    await expect(element(by.id('Submit Button Forgot Password'))).toBeVisible();
  });
})

describe('Forgot Password - flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Forgot Password?')).tap();
  });

  it('Should send email for reset password and show modal', async () => {
    await expect(element(by.id('Email Input Forgot Password'))).toBeVisible();
    await element(by.id('Email Input Forgot Password')).typeText('ardit.vula@ohmygreen.com');
    await element(by.id('Submit Button Forgot Password')).tap();

    await expect(element(by.id('Modal Reset Password Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should insert email, which is not registered for reset password and show modal', async () => {
    await expect(element(by.id('Email Input Forgot Password'))).toBeVisible();
    await element(by.id('Email Input Forgot Password')).tap();
    await element(by.id('Email Input Forgot Password')).typeText('testestbla@gmail.com');
    await element(by.id('Submit Button Forgot Password')).tap();

    await expect(element(by.id('Invalid Email Modal Forgot Password'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should insert email, which is not confirmed for reset password and show modal', async () => {
    await expect(element(by.id('Email Input Forgot Password'))).toBeVisible();
    await element(by.id('Email Input Forgot Password')).tap();
    await element(by.id('Email Input Forgot Password')).typeText('nik.adzic90@gmail.com');
    await element(by.id('Submit Button Forgot Password')).tap();

    await expect(element(by.id('Modal Reset Password Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });
})