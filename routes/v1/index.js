const router = require(`express`).Router();

const productRouter = require("./productRoutes");
const userRouter = require("./userRoutes");

router.use(`/`, userRouter);
router.use(`/products`, productRouter);

module.exports = router;