const User = require("../models/user");
const { hashPass, checkPass } = require("../utils/bcrypt");
const { genToken } = require("../utils/jsonwebtoken");

class UserController {

    static registerForm(req, res) {
        const { errors } = req.query
        let status = 200
        if(errors) status = 400
        return res.status(status).render(`register`, { errors })
    }

    static register(req, res) {
        const { username, password } = req.body;

        let inputValidator = [];
        if(!username) inputValidator.push(`Username is required!`);
        if(!password) inputValidator.push(`Password is required!`);
        if(inputValidator.length !== 0) return res.redirect(`/register?errors=` + inputValidator.join(`&errors=`))

        hashPass(password)
        .then(function(hashedPass) {
            User.registerUser(username, hashedPass)
            .then(function(response) {
                console.log(response)
                res.redirect(`/register`);
            })
            .catch(function(err) {
                res.redirect(`/register?error=`);
            })
        })
        .catch(function(err) {
            if(err.name === `Bad Request`) res.redirect(`/register?errors=` + err.messages)
            console.error(err);
            res.render(`error`);
        })
    }

    static loginForm(req, res) {
        const { errors } = req.query
        let status = 200
        if(errors) status = 401
        res.status(status).render(`login`, { errors })
    }

    static login(req, res) {
        const { username, password } = req.body
        let userId;
        User.findUser(username)
        .then(function({ rows }) {
            const { id_pengguna, password_pengguna } = rows[0];
            userId = id_pengguna;
            return checkPass(password, password_pengguna);
        })
        .then(function(doesPassMatch) {
            if(!doesPassMatch) {
                throw { name: `Unauthorized`, statusCode: 401 }
            }
            const access_token =  genToken({ userId });
            res.cookie(`access_token`, access_token, { httpOnly: true, maxAge: 18000000 }).redirect(`/products`)
        })
        .catch(function(err) {
            if(err.name === `Unauthorized`) {
                res.redirect(`/?errors=InvalidUsernamelOrPassword`)
            }
        })
    }
}

module.exports = UserController;