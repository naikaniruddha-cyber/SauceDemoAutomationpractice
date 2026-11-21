const {test,expect}= require('@playwright/test');
const{LoginPage}=require('../pages/LoginPage');
const users=require('../data/user');
const constant=require('../data/constants');

/** @type {LoginPage} */
let loginPage;
test.beforeEach(async({page})=> {
loginPage=new LoginPage(page);
await loginPage.open();
})

//test case--1 Login scenario

test('user can login with valid credentials @smoke', async({page})=>{

 // await page.goto('/');
  //await page.getByPlaceholder("Username").fill(users.standardUser.username);
  //await page.getByPlaceholder("Password").fill(users.standardUser.password);
  //await page.getByRole('button',{name:'Login'}).click();
  await loginPage.login(users.standardUser.username,users.standardUser.password);
  //await expect(page).toHaveURL(constant.urls.inventory);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('.title')).toHaveText(constant.text.productTitle);
});