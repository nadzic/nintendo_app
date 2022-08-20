describe('Scan Kitchen - flow', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await device.launchApp({permissions: {camera: 'YES'}});
    });

    it('Should go to scan product, successfully scan product (valid code)', async () => {
      await expect(element(by.id('Email Input Login'))).toBeVisible();
      await expect(element(by.id('Password Input Login'))).toBeVisible();

      await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
      await element(by.id('Password Input Login')).typeText('povio123');
      await element(by.text('Log In')).tap();

      await expect(element(by.text('Scan product barcode'))).toBeVisible();
      await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

      await element(by.id('Upc Product Number Scan Product')).tap();
      await element(by.id('Upc Product Number Scan Product')).typeText('899587003128');

      await element(by.id('Apply Button Scan Product')).tap();

      await waitFor(element(by.text('Raw Superfood Bar $2.29'))).toBeVisible().withTimeout(1800);
    });

    it('Should go to scan product, not successfully scan product (invalid code)', async () => {
      await expect(element(by.text('Scan product barcode'))).toBeVisible();
      await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

      await element(by.id('Upc Product Number Scan Product')).tap();
      await element(by.id('Upc Product Number Scan Product')).typeText('897989809088');

      await element(by.id('Apply Button Scan Product')).tap();

      await expect(element(by.id('Modal Product Code Not Valid Login'))).toBeVisible();
      await element(by.text('OK')).tap();
    });

    it('Should go to scan product, successfully scan product two times (valid code)', async () => {

        await expect(element(by.text('Scan product barcode'))).toBeVisible();
        await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).typeText('899587003128\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Raw Superfood Bar $2.29'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Raw Superfood Bar $2.29'))).toBeVisible().withTimeout(1800);

        await element(by.text('Checkout 2 items')).tap();

        await expect(element(by.text('Raw Superfood Bar')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Raw Superfood Bar')).atIndex(1)).toBeVisible();
      });
  });