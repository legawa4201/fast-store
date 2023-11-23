const pool = require(`../config/connection`);

class Product {
    constructor(product_id, product_name, price, category, status, user) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.price = price;
        this.category = category;
        this.status = status;
        this.user = user;
    }
}

module.exports = Product