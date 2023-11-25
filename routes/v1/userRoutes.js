const UserController = require("../../controllers/userController");

const userRouter = require(`express`).Router();

userRouter.get(`/login`);
userRouter.post(`/login`);

userRouter.get(`/register`, UserController.registerForm);
userRouter.post(`/register`, UserController.register);

module.exports = userRouter