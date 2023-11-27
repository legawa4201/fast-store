const { pool } = require(`../config/connection`);
const { getCurrentDate } = require("../utils/sqlHelpers");

class Product {
    constructor(product_id, product_name, price, category, status, user, createdAt, updatedAt) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.price = price;
        this.category = category;
        this.status = status;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getFormattedDate(date) {
        let getFormat = date.toLocaleTimeString(`id-ID`, { year: `numeric`, month: `numeric`, day: `numeric` }).split(`,`)
        return getFormat[0].split(`/`).join(`-`) + getFormat[1].split(`.`).join(`:`)
    }

    static findProducts(options) {
        let baseQuery = `
        SELECT p.id_produk, p.nama_produk, u.username_pengguna
        FROM "Produk" p 
        JOIN "Pengguna" u ON p.pengguna_id = u.id_pengguna
        ORDER BY p.diperbarui_tanggal DESC
        `;
        let productsPerPage = `LIMIT 10 `;
        if(options.pages !== undefined) {
            baseQuery += productsPerPage + `OFFSET ${(options.pages - 1) * 10};`;
            return pool.query(baseQuery);
        } else {
            baseQuery += productsPerPage + `OFFSET 0;`
                return pool.query(baseQuery);
        }

    }

    static getTotalProduct() {
        
        let baseQuery = `
        SELECT COUNT(*)
        FROM "Produk"
        `;
        return pool.query(baseQuery);
    }

    static findOneProduct(id_produk) {
        let baseQuery = `
        SELECT p.id_produk, p.nama_produk, p.harga, k.nama_kategori, s.nama_status, u.username_pengguna, p.dibuat_tanggal, p.diperbarui_tanggal
        FROM "Produk" p 
        JOIN "Kategori" k ON p.kategori_id = k.id_kategori 
        JOIN "Status" s ON p.status_id = s.id_status 
        JOIN "Pengguna" u ON p.pengguna_id = u.id_pengguna
        WHERE p.id_produk = $1;
        `

        return pool.query(baseQuery, [id_produk])
    }

    static createProduct(product_detail, user_id) {

        const { name, price, category_id, status_id } = product_detail;
        let baseQuery = `
        INSERT INTO "Produk"("nama_produk", "harga", "kategori_id", "status_id", "pengguna_id", "dibuat_tanggal", "diperbarui_tanggal")
        VALUES($1, $2, $3, $4, $5, $6, $7);
        `;

        return pool.query(baseQuery, [name, price, category_id, status_id, user_id, getCurrentDate(), getCurrentDate()]);
    }

    static editProduct({ name, price, category_id, status_id }, id_produk) {

        let baseQuery = `
        UPDATE "Produk"
        SET
        nama_produk = $1,
        harga = $2,
        kategori_id = $3,
        status_id = $4,
        diperbarui_tanggal = $5
        WHERE id_produk = $6;
        `;

        return pool.query(baseQuery, [name, price, category_id, status_id, getCurrentDate(), id_produk]);
    }

    static deleteProduct(product_id) {
        let baseQuery = `
        DELETE FROM "Produk"
        WHERE id_produk = $1;
        `;

        return pool.query(baseQuery, [product_id]);
    }
}

module.exports = Product