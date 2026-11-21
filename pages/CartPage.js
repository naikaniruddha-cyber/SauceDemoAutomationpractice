class Cart {
    constructor(page)
    {
       this.cartLink=page.locator('["data-test=shopping-cart-badge"]');
       this.itemNames=page.locator('[data-test="inventory-item-name"]');
       this.cartItem=page.locator('[data-test="inventory-item-name"]');
       this.checkoutButton=page.locator('[data-test="checkout"]');
       this.firstNameInput=page.locator('[data-test="firstName"]');
       this.lastNameInput=page.locator('[data-test="lastName"]');
       this.postalCodeInput=page.locator('[data-test="postalCode"]');
       this.continueToOverviewButton=page.locator('[data-test="continue"]');
    } 

    async goToCart() {
        await this.cartLink.click();
    }

    async getAllCartNames(){
        return await this.itemNames.allTextContents();
    }

    async removeProduct(productName){
        const item=this.cartItem(productName)
        await item.getByRole('button',{name:'Remove'}).click();

    }
     getCartItem(productName){
        return this.cartItem.filter({hasText: productName})
     }

     async getCartItemCount() {
        return this.cartItem.count();
     }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }

    async fillInformation(firstName,lastName,postalCode){
     await this.firstNameInput.fill(firstName);
     await this.lastNameInput.fill(lastName);
     await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {

    }
}

module.exports={Cart};