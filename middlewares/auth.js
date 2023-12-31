const Product = require("../models/product");
const User = require("../models/user");
const { verifToken } = require("../utils/jsonwebtoken");

function authentication(req, res, next) {
    try {
        const { access_token } = req.cookies;

        const { userId } = verifToken(access_token)
        User.findUserById(userId)
        .then(function({ rows }) {
            req.user = { userId, ...rows[0] }
            next()
        })
        .catch(function(err) {
            res.status(404).render(`error`)
        })
    } catch(err) {
        if(err.name === `JsonWebTokenError`) {
            return res.redirect(`/`)
        }
        res.status(500).render(`error`)
    }
}

function authorizationDeleteEdit(req, res, next) {
    const { user } = req;
    const { id: productId } = req.params;
    Product.findOneProduct(productId)
    .then(function({ rows }) {
        if(rows[0].username_pengguna !== user.username_pengguna) {
            res.redirect(`/products?errors=forbidden`);
        } else {
            next();
        }
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).render(`error`)
    })
}

module.exports = {
    authentication,
    authorizationDeleteEdit
}