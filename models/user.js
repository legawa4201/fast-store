const pool = require(`../config/connection`);

class User {
    constructor(user_id, username, password, role) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

}

module.exports = User;