const { pool } = require(`../config/connection`);

class Status {
    constructor(status_id, status_name) {
        this.status_id = status_id; 
        this.status_name = status_name;
    }

    static findStatus() {
        
        let baseQuery = `
        SELECT id_status, nama_status
        FROM "Status";
        `;
        return pool.query(baseQuery);
    }
}

module.exports = Status;