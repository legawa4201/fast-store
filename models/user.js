const { pool } = require(`../config/connection`);
const { getCurrentDate } = require("../utils/sqlHelpers");

class User {
    constructor(user_id, username, password, role) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static findUser(username) {
        let baseQuery = `
        SELECT id_pengguna, username_pengguna, password
        FROM "Pengguna"
        WHERE username = $1;
        `;
        return pool.query(baseQuery, [username]);
    }

    static registerUser(username, password) {
        console.log(password)
        let baseQuery = `
        INSERT INTO "Pengguna"("username_pengguna", "password_pengguna", "role_pengguna", "dibuat_tanggal", diperbarui_tanggal)
        VALUES($1, $2, $3, $4, $5);
        `;
        return pool.query(baseQuery, [username, password, `admin`, getCurrentDate(), getCurrentDate()])
    }
}

module.exports = User;