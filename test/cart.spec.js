//@ts-check
const {test,expect}= require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const {Inventory}=require('../pages/Inventory');
const {Cart}=require('../pages/CartPage');
const constant=require('../data/constants');
const users = require('../data/users');

/**@type {LoginPage} */
let loginPage;

/**@type {Inventory} */
let inventory;

/**@type {Cart} */
let cart;

test.beforeEach (async({page})=>{
loginPage=new LoginPage(page);
inventory=new Inventory(page);
cart=new Cart(page);


await loginPage.open();
await loginPage.login(users.standardUser.username,users.standardUser.password);



})

test('added products appears correctly in cart',async({page})=>{
      inventory.addProductToCart(constant.text.SauceLabsBackPackText);
      inventory.addProductToCart(constant.text.SauceLabsBikeLightText);

      await cart.goToCart();
     await expect(page).toHaveURL(/\/cart\.html$/);
     const itemNames=await cart.getAllCartNames();
     expect(itemNames).toEqual([constant.text.SauceLabsBackPackText,constant.text.SauceLabsBikeLightText]);
})

test('product can be removed from the cart',async({page})=>{
      inventory.addProductToCart(constant.text.SauceLabsBackPackText);
      inventory.addProductToCart(constant.text.SauceLabsBikeLightText);
      await cart.goToCart();

      await cart.removeProduct(constant.text.SauceLabsBackPackText);
      const count=await cart.getCartItemCount();
      expect (count).toBe(1);

      const cartPage= new Cart(page);
      const remainingNames=await cartPage.getAllCartNames();
      expect(remainingNames).toEqual(constant.text.SauceLabsBikeLightText);
})

test('Add a product to cart and head to checkout and user can proceed with right info', async({page})=>{
    inventory.addProductToCart(constant.text.SauceLabsBackPackText);
    inventory.addProductToCart(constant.text.SauceLabsBikeLightText);
    await cart.goToCart();

    cart.clickOnCheckout();
    cart.fillInformation(constant.checkoutData.firstName,constant.checkoutData.lastName,constant.checkoutData.postalCode);
    cart.continueToOverviewButton();

    await expect(page).toHaveURL(constant.urls.checkout2url);

    const subtotal=await cart.getsubtotal();
    const tax=await cart.getTax();
    const total= await cart.getTotal();

    expect(total).toBeCloseTo(subtotal+tax,2);

    cart.clickFinishButton();
    await expect(page).toHaveURL(constant.urls.thankPageURL);
    await expect(cart.getCompleteHeaderButton).toHaveText('Thank You for your Order!');
});

