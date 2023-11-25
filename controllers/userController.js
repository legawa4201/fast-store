const User = require("../models/user");
const { hashPass } = require("../utils/bcrypt");

class UserController {

    static registerForm(req, res) {
        res.render(`register`)
    }

    static register(req, res) {
        const { username, password } = req.body;
        console.log(username, password)
        hashPass(password)
        .then(function(hashedPass) {
            User.registerUser(username, hashedPass);
        })
        .catch(function(err) {
            console.error(err);
            res.render(`error`);
        })
    }

    static login(req, res) {
    }

    static getUser(req, res) {
    }
}

module.exports = UserController;