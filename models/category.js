const { pool } = require(`../config/connection`);

class Category {
    constructor(category_id, category_name) {
        this.category_id = category_id;
        this.category_name = category_name;
    }

    static findCategories() {

        let baseQuery = `
        SELECT id_kategori, nama_kategori
        FROM "Kategori";
        `;
        return pool.query(baseQuery);
    }
}

module.exports = Category;