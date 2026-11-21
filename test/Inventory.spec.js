//@ts-check
const {test,expect}= require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const {Inventory}=require('../pages/Inventory');
const constant=require('../data/constants');
/**@type {LoginPage} */
let loginPage;

/**@type {Inventory} */
let inventory;

test.beforeEach (async({page})=>{
 loginPage=new LoginPage(page);
 inventory=new Inventory(page);
 await loginPage.open();

});

test('cart badge update when adding products', async ({page})=>{

  inventory.addProductToCart(constant.text.SauceLabsBackPackText);
  inventory.addProductToCart(constant.text.SauceLabsBikeLightText);
  const cartCount=await inventory.getCartCount;
  expect(cartCount).toBe(2);
})

test('products can be sorted by price low to high', async({page})=>{
    inventory.sortBy(constant.sortOptions.priceLowToHigh);//click on the sort option
    const prices=await inventory.getAllProductPrices();
    const  sortedPrices= [...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrices);
});