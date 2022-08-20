describe('Payment Complete - flow', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await device.launchApp({permissions: {camera: 'YES'}});
    });

    it('Should try to go throught the whole flow with adding 2 products and having already added the credit card', async () => {

        await expect(element(by.id('Email Input Login'))).toBeVisible();
        await expect(element(by.id('Password Input Login'))).toBeVisible();

        await element(by.id('Email Input Login')).typeText('ardit.vula@ohmygreen.com');
        await element(by.id('Password Input Login')).typeText('povio123');
        await element(by.text('Log In')).tap();

        await expect(element(by.text('Scan product barcode'))).toBeVisible();
        await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();

        // adding two times first product

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).typeText('899587003128\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Raw Superfood Bar $2.29'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Raw Superfood Bar $2.29'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        // go to shopping cart

        await element(by.text('Checkout 2 items')).tap();

        await expect(element(by.text('Raw Superfood Bar')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Raw Superfood Bar')).atIndex(1)).toBeVisible();

        await expect(element(by.text('$4.58'))).toBeVisible();

        await element(by.text('Confirm and Pay')).tap();

        await waitFor(element(by.text('Pay $4.58'))).toBeVisible().withTimeout(2000);

        await element(by.text('Pay $4.58')).tap();

        await waitFor(element(by.text('$4.58'))).toBeVisible().withTimeout(3000);
        await waitFor(element(by.text('Payment Complete'))).toBeVisible().withTimeout(3000);
        await waitFor(element(by.text('Email receipt has been sent'))).toBeVisible().withTimeout(3000);

        await waitFor(element(by.text('Return to Scan Product'))).toBeVisible().withTimeout(3000);
        await element(by.text('Return to Scan Product')).tap();

        await expect(element(by.text('Scan product barcode'))).toBeVisible();
        await expect(element(by.id('Logo Dark Scan Product'))).toBeVisible();
      });

  });