const { connect } = require(`../config/connection`)

connect(function(err, client) {

    if(err) {
        console.error(err);
        process.exit(1)
    }
    
    console.log(`Successfully connected to database...`);

    client.query(`
    TRUNCATE "Produk", "Kategori", "Status", "Pengguna" CASCADE;
    `)
    .then(function(_) {
        console.log(`Undo seeding complete...`);
        process.exit(1);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    })
})