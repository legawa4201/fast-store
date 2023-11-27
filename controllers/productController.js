const Product = require("../models/product");
const Category = require("../models/category")
const Status = require("../models/status")

class ProductController {
    
    static getProduct(req, res) {
        const { id } = req.body
    }
    
    static getProducts(req, res) {

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
            res.render(`dashboard`, { products, totalProduct });
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
            res.render(`error`);
        })
        
    }

    static addProduct(req, res) {
        try {
        const { userId } = req
        const { name, price, category_id, status_id } = req.body
        let errors = []
        if(!name) errors.push(`Product name is required!`);
        if(!price) errors.push(`Product price is required!`);
        if(!category_id) errors.push(`Product category is required!`);
        if(!status_id) errors.push(`Product status is required!`);
        if(errors.length !== 0) throw { name: `BadRequest`, errors }
        Product.createProduct(req.body, userId)
        .then(function(result) {
            return Product.getTotalProduct()
        })
        .then(function({ rows }) {
            const lastPage = Math.ceil(rows[0].count/10)
            res.redirect(`/products?pages=${lastPage}`)
        })
        .catch(function(err) {
            res.render(`error`)
        })
        } catch(err) {
            if(err.name === `BadRequest`) res.redirect(`/products/add-product?errors=` + err.errors.join(`&errors=`))
        }
    }

    static editProduct(req, res) {
    }

    static deleteProduct(req, res) {
        const { id } = req.params;
        Product.deleteProduct(id)
        .then(function({ rows }) {
        })
        .catch(function(err) {
        })
    }
}

module.exports = ProductController;