const userRouter = require(`express`).Router();

userRouter.get(`/login`);
userRouter.post(`/login`);

userRouter.get(`/register`);
userRouter.post(`/register`);

module.exports = userRouter