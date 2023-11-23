const productRouter = require(`express`).Router();

productRouter.get(`/`);

productRouter.get(`/add`);
productRouter.post(`/add`);

productRouter.get(`/edit/:id`);
productRouter.put(`/edit/:id`);

productRouter.get(`/delete/:id`);
productRouter.get(`/:id`);

module.exports = productRouter;