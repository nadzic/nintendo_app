describe('Login - visible basic elements', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('All basic elements should be visible', async () => {
    await expect(element(by.id('Logo White Login'))).toBeVisible();
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();
    await expect(element(by.id('Log In Button Login'))).toBeVisible();
    await expect(element(by.id('Create Account Login'))).toBeVisible();
    await expect(element(by.id('Forgot Password Login'))).toBeVisible();
  });
});

describe('Login - flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.launchApp({permissions: {camera: 'YES'}});
  });

  it('Should login successfully with already added kitchen (logout after)', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
    await element(by.id('Password Input Login')).typeText('povio123');
    await element(by.text('Log In')).tap();

    await expect(element(by.text('Scan product barcode'))).toBeVisible();
    await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

    await element(by.id('Menu Scan Product')).tap();
    await element(by.text('Log Out')).tap();
  });

  it('Should try to login with not registred email', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('testest@test.com');
    await element(by.id('Password Input Login')).typeText('test123');
    await element(by.text('Log In')).tap();

    await expect(element(by.id('Modal Not Registred Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should try to login with registred email and wrong password', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
    await element(by.id('Password Input Login')).typeText('password123');
    await element(by.text('Log In')).tap();

    await expect(element(by.id('Modal Invalid Password Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should try to login with registred email address and wrong password', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
    await element(by.id('Password Input Login')).typeText('password123');
    await element(by.text('Log In')).tap();

    await expect(element(by.id('Modal Invalid Password Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should try to login with registred email address and not confirmed', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('nik.adzic90@gmail.com');
    await element(by.id('Password Input Login')).typeText('password123');
    await element(by.text('Log In')).tap();

    await expect(element(by.id('Modal Not Confirmed Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });
});