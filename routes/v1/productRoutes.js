const productRouter = require(`express`).Router();

const ProductController = require("../../controllers/productController");

productRouter.get(`/`, ProductController.getProducts);

productRouter.get(`/add`);
productRouter.post(`/add`);

productRouter.get(`/edit/:id`);
productRouter.put(`/edit/:id`);

productRouter.get(`/delete/:id`);
productRouter.get(`/:id`);

module.exports = productRouter;