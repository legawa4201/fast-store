const productRouter = require(`express`).Router();

const ProductController = require("../../controllers/productController");
const { authentication, authorizationDeleteEdit } = require("../../middlewares/auth");

productRouter.use(authentication)

productRouter.get(`/`, ProductController.getProducts);

productRouter.get(`/add-product`, ProductController.productForm);
productRouter.post(`/add-product`, ProductController.addProduct);

productRouter.get(`/edit-product/:id`, authorizationDeleteEdit, ProductController.editForm);
productRouter.post(`/edit-product/:id`, authorizationDeleteEdit, ProductController.editProduct);

productRouter.get(`/delete-product/:id`, authorizationDeleteEdit, ProductController.deleteProduct);

productRouter.get(`/:id`);

module.exports = productRouter;