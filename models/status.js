const pool = require(`../config/connection`);

class Status {
    constructor(status_id, status_name) {
        this.status_id = status_id;
        this.status_name = status_name;
    }
}

module.exports = Status;