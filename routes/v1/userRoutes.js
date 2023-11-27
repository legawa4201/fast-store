const UserController = require("../../controllers/userController");
const { authentication }  = require(`../../middlewares/auth`);

const userRouter = require(`express`).Router();

userRouter.get(`/`, UserController.loginForm);
userRouter.post(`/login`, UserController.login);

userRouter.get(`/register`, authentication, UserController.registerForm);
userRouter.post(`/register`, authentication, UserController.register);

module.exports = userRouter