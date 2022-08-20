describe('Scan Kitchen - flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.launchApp({permissions: {camera: 'YES'}});
  });

  it('Should go to scan kitchen, successfully scan and go back to scan kitchen again', async () => {
    await expect(element(by.id('Email Input Login'))).toBeVisible();
    await expect(element(by.id('Password Input Login'))).toBeVisible();

    await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
    await element(by.id('Password Input Login')).typeText('povio123');
    await element(by.text('Log In')).tap();

    await expect(element(by.text('Scan product barcode'))).toBeVisible();
    await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

    await element(by.id('Menu Scan Product')).tap();
    await element(by.id('Kitchen Menu')).tap();

    await element(by.id('Upc Kitchen Number Scan Kitchen')).tap();
    await element(by.id('Upc Kitchen Number Scan Kitchen')).typeText('1');

    await element(by.id('Apply Button Scan Kitchen')).tap();

    await waitFor(element(by.text('ohmygreen'))).toBeVisible().withTimeout(1800);

    await waitFor(element(by.id('Menu Scan Product'))).toBeVisible().withTimeout(3000);

    await element(by.id('Menu Scan Product')).tap();
    await element(by.id('Kitchen Menu')).tap();

    await element(by.id('Upc Kitchen Number Scan Kitchen')).tap();
    await element(by.id('Upc Kitchen Number Scan Kitchen')).typeText('500');

    await element(by.id('Apply Button Scan Kitchen')).tap();

    await waitFor(element(by.text('Asurion'))).toBeVisible().withTimeout(1500);
  });

  it('Should go to scan kitchen, successfully scan and go back to scan kitchen again', async () => {
    await expect(element(by.text('Scan product barcode'))).toBeVisible();
    await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

    await element(by.id('Menu Scan Product')).tap();
    await element(by.id('Kitchen Menu')).tap();

    await element(by.id('Upc Kitchen Number Scan Kitchen')).tap();
    await element(by.id('Upc Kitchen Number Scan Kitchen')).typeText('239744923');

    await element(by.id('Apply Button Scan Kitchen')).tap();

    await expect(element(by.id('Modal Kitchen Code Not Valid Login'))).toBeVisible();
    await element(by.text('OK')).tap();
  });
});