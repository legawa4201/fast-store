const Product = require("../models/product");
const Category = require("../models/category")
const Status = require("../models/status")

class ProductController {
    
    static getProduct(req, res) {
        const { id } = req.params
        Product.findOneProduct(id)
        .then(function({ rows }) {
            const { id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal } = rows[0]
            res.render(`detail`, { product: new Product(id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal) });
        })
        .catch(function(err) {
            res.status(500).render(`error`);
        })
    }
    
    static getProducts(req, res) {

        let { success, errors } = req.query
        let totalProduct;

        Product.getTotalProduct()
        .then(function({ rows }) {
            totalProduct = rows[0].count;
            return Product.findProducts(req.query);
        })
        .then(function({ rows }) {

            const products = rows.map(function(prod) {
                const { id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal } = prod;
                return new Product(id_produk, nama_produk, harga, nama_kategori, nama_status, username_pengguna, dibuat_tanggal, diperbarui_tanggal);
            });
            res.render(`dashboard`, { products, totalProduct, success, errors });
        })
        .catch(function(err) {
            console.error(err);
            res.render(`error`)
        }) 
    }

    static productForm(req, res) {

        const { errors } = req.query
        let categories = []
        let status = []
        Category.findCategories()
        .then(function({ rows }) {
            rows.forEach(function(cat) {
                categories.push(new Category(cat.id_kategori, cat.nama_kategori));
            })
            return Status.findStatus()
        })
        .then(function({ rows }) {
            rows.forEach(function(stat) {
                status.push(new Status(stat.id_status, stat.nama_status));
            });
            res.render(`form-product`, { categories, status, errors });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).render(`error`);
        })
        
    }

    static addProduct(req, res) {
        try {
        const { userId } = req.user
        const { name, price, category_id, status_id } = req.body
        let errors = []
        if(!name) errors.push(`Product name is required!`);
        if(!price) errors.push(`Product price is required!`);
        if(!category_id) errors.push(`Product category is required!`);
        if(!status_id) errors.push(`Product status is required!`);
        if(errors.length !== 0) throw { name: `BadRequest`, errors }
        Product.createProduct(req.body, userId)
        .then(function(result) {
            res.redirect(`/products`)
        })
        .catch(function(err) {
            console.error(err)
            res.status(500).render(`error`)
        })
        } catch(err) {
            if(err.name === `BadRequest`) return res.redirect(`/products/add-product?errors=` + err.errors.join(`&errors=`))
        }
    }

    static editForm(req, res) {
        const { id } = req.params
        let errors;
        let success;
        let categories = [];
        let status = [];
        Status.findStatus()
        .then(function({ rows }) {
            rows.forEach(function(stat) {
                status.push(new Status(stat.id_status, stat.nama_status))
            })
            return Category.findCategories()
        })
        .then(function({ rows }) {
            rows.forEach(function(cat) {
                categories.push(new Category(cat.id_kategori, cat.nama_kategori))
            })
            return Product.findOneProduct(id)
        })
        .then(function({ rows }) {
            res.render(`edit-form`, { product: rows[0], categories, status,  errors })
        })
        .catch(function(err) {
            console.error(err)
            res.status(500).render(`error`)
        })
    }

    static editProduct(req, res) {
        const { id } = req.params
        Product.editProduct(req.body, id)
        .then(function(response) {
            res.redirect(`/products`)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).render(`error`)
        })
    }

    static deleteProduct(req, res) {
        const { id } = req.params;
        Product.deleteProduct(id)
        .then(function({ rows }) {
            res.redirect(`/products?success=deleted`)
        })
        .catch(function(err) {
            res.status(500).render(`error`)
        })
    }
}

module.exports = ProductController;