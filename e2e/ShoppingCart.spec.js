describe('Shopping Cart - flow', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await device.launchApp({permissions: {camera: 'YES'}});
    });

    it('Should add few different products, go to shopping cart, try to delete some of them and check it deleting works', async () => {

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

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).clearText();

        // adding two times second product

        await element(by.id('Upc Product Number Scan Product')).typeText('898248001572\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 5.3oz $1.69'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 5.3oz $1.69'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).clearText();

        // adding two times third product

        await element(by.id('Upc Product Number Scan Product')).typeText('894455000254\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 1.4oz $1.99'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 1.4oz $1.99'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        // go to shopping cart

        await element(by.text('Checkout 6 items')).tap();

        await expect(element(by.text('Raw Superfood Bar')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Raw Superfood Bar')).atIndex(1)).toBeVisible();

        await element(by.id('Scroll View Shopping Cart')).scroll(200, 'down');

        await expect(element(by.text('Icelandic Yogurt, 5.3oz')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Icelandic Yogurt, 5.3oz')).atIndex(1)).toBeVisible();

        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz')).atIndex(1)).toBeVisible();

        await element(by.id('Scroll View Shopping Cart')).scroll(200, 'up');

        // delete every second product, each of them
        await waitFor(element(by.id('Delete Product 1 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 1 Shopping Cart')).tap();

        await waitFor(element(by.id('Delete Product 2 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 2 Shopping Cart')).tap();

        await waitFor(element(by.id('Delete Product 3 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 3 Shopping Cart')).tap();

        await expect(element(by.text('Raw Superfood Bar'))).toBeVisible();
        await expect(element(by.text('Icelandic Yogurt, 5.3oz'))).toBeVisible();
        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz'))).toBeVisible();
      });

      it('Should add few different products, go to shopping cart and emtpy the cart', async () => {

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

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).clearText();

        // adding two times second product

        await element(by.id('Upc Product Number Scan Product')).typeText('898248001572\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 5.3oz $1.69'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 5.3oz $1.69'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Upc Product Number Scan Product')).tap();
        await element(by.id('Upc Product Number Scan Product')).clearText();

        // adding two times third product

        await element(by.id('Upc Product Number Scan Product')).typeText('894455000254\n');

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 1.4oz $1.99'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        await element(by.id('Apply Button Scan Product')).tap();

        await waitFor(element(by.text('Icelandic Yogurt, 1.4oz $1.99'))).toBeVisible().withTimeout(1800);

        await waitFor(element(by.id('Apply Button Scan Product'))).toBeVisible().withTimeout(2000);

        // go to shopping cart

        await element(by.text('Checkout 6 items')).tap();

        await expect(element(by.text('Raw Superfood Bar')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Raw Superfood Bar')).atIndex(1)).toBeVisible();

        await element(by.id('Scroll View Shopping Cart')).scroll(200, 'down');

        await expect(element(by.text('Icelandic Yogurt, 5.3oz')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Icelandic Yogurt, 5.3oz')).atIndex(1)).toBeVisible();

        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz')).atIndex(1)).toBeVisible();

        await element(by.id('Scroll View Shopping Cart')).scroll(200, 'up');

        // delete every second product, each of the

        await element(by.id('Scroll View Shopping Cart')).scroll(200, 'down');
        await waitFor(element(by.id('Delete Product 5 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 5 Shopping Cart')).tap();
        await waitFor(element(by.id('Delete Product 4 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 4 Shopping Cart')).tap();
        await waitFor(element(by.id('Delete Product 3 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 3 Shopping Cart')).tap();
        await waitFor(element(by.id('Delete Product 2 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 2 Shopping Cart')).tap();
        await waitFor(element(by.id('Delete Product 1 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 1 Shopping Cart')).tap();
        await waitFor(element(by.id('Delete Product 0 Shopping Cart'))).toBeVisible().withTimeout(1000);
        await element(by.id('Delete Product 0 Shopping Cart')).tap();

        await expect(element(by.text('Raw Superfood Bar'))).toBeNotVisible();
        await expect(element(by.text('Icelandic Yogurt, 5.3oz'))).toBeNotVisible();
        await expect(element(by.text('Chocolate Peanut Butter Cup, 1.4oz'))).toBeNotVisible();

        await expect(element(by.text('Your cart is empty.\nPlease scan to add items.'))).toBeVisible();
      });
  });