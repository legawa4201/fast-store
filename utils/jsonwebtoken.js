const jwt = require(`jsonwebtoken`);
const SECRET = process.env.JWT_SECRET || `IniRahasia`

function genToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "5h" })
}

function verifToken(token) {
    return jwt.verify(token, SECRET)
}

module.exports = {
    genToken,
    verifToken
}