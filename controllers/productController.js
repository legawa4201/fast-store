const Product = require("../models/product");

class ProductController {
    
    static getProduct(req, res) {
        const { id } = req.body
    }
    
    static getProducts(req, res) {
        Product.findProducts()
        .then(function({ rows }) {

            const products = rows.map(function(prod) {
                const { id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal } = prod;
                return new Product(id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal);
            });
            res.render(`dashboard`, { products })
        })
        .catch(function(err) {
            
            console.error(err);
            res.render(`error`)
        }) 
    }

    static addProduct(req, res) {
    }

    static editProduct(req, res) {
    }

    static deleteProduct(req, res) {
    }
}

module.exports = ProductController;