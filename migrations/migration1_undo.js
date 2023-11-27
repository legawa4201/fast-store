const { connect } = require(`../config/connection`)

connect(function(err, client) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    
    console.log(`Successfully connected to database...`);

    client.query(`
    DROP TABLE IF EXISTS "Produk";
    `)
    .then(function(_) {
        console.log(`Produk table dropped...`);
        return client.query(`
        DROP TABLE IF EXISTS "Kategori";
        `);
    })
    .then(function(_) {
        console.log(`Kategori table dropped...`)
        return client.query(`
        DROP TABLE IF EXISTS "Status";
        `);
    })
    .then(function(_) {
        console.log(`Status table dropped...`)
        return client.query(`
        DROP TABLE IF EXISTS "Pengguna";
        `);
    })
    .then(function(response) {
        console.log(`Pengguna table dropped...`);
        console.log(`Migration undo complete...`);
        process.exit(1);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
});