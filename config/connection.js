require(`dotenv`).config()
const { Pool } = require(`pg`);

let connectionString;

if(process.env.NODE_ENV === `development`) connectionString = process.env.DB_DEV_URI;
if(process.env.NODE_ENV === `production`) connectionString = process.env.DB_PROD_URI;

const pool = new Pool({ connectionString });

let client;
function connect(status) {
    pool.connect()
    .then(function(Client) {
        client = Client
        return status(null, Client)
    })
    .catch(function(err) {
        return status(err)
    })
}

module.exports = {
    connect,
    client
}