const bcrypt = require(`bcryptjs`)

function hashPass(plainPass) {
    bcrypt.genSalt(10)
    .then(function(salt) {
        return bcrypt.hash(plainPass, salt);
    })
    .catch(function(err) {
        throw err
    });
}

function checkPass(plainPass, hashedPass) {
    return bcrypt.compare(plainPass, hashedPass);
}

module.exports = {
    hashPass,
    checkPass
}