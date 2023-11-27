const UserController = require("../../controllers/userController");

const userRouter = require(`express`).Router();

userRouter.get(`/`, UserController.loginForm);
userRouter.post(`/login`, UserController.login);

userRouter.get(`/register`, UserController.registerForm);
userRouter.post(`/register`, UserController.register);

module.exports = userRouter