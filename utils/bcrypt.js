const bcrypt = require(`bcryptjs`)

function hashPass(plainPass) {
    return bcrypt.hash(plainPass, 10)
}

function checkPass(plainPass, hashedPass) {
    return bcrypt.compare(plainPass, hashedPass);
}

module.exports = {
    hashPass,
    checkPass
}