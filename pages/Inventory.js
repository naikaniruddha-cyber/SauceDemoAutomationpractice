class Inventory {
    constructor(page)
    {
       this.inventoryItems=page.locator('[data-test="inventory-item"]');
       this.cartBadge=page.locator('.shopping_cart_badge');
       this.sortDropDown=page.locator('[data-test="product-sort-container"]');
       this.itemPrices=page.locator('[data-test="inventory-item-price"]');
    }

    getProductCard(productname){
       return this.inventoryItems.filter({hasText: productname });
    }

    async addProductToCart(productName) {
      const product=this.getProductCard(productName);
      await product.getByRole('button',{name: 'Add to cart'}).click();
    }

    async getCartCount(){
        const hasBadge=await this.cartBadge.count();
        if(hasBadge===0) return 0;
        return parseInt(await this.cartBadge.textContent(),10);
    }

    async sortBy(optionvalue) {
        await this.sortDropDown.selectOption(optionvalue);//this will select lohi
    }

    async getAllProductPrices() {
        const priceTexts= await this.itemPrices.allTextContents();
        return priceTexts.map((p)=> parseFloat(p.replace('$','')));
    }
}

module.exports={Inventory};