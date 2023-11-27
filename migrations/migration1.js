const { connect } = require(`../config/connection`)

connect(function(err, client) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    
    console.log(`Successfully connected to database...`);

    client.query(`
    CREATE TABLE IF NOT EXISTS "Kategori" (
        id_kategori SERIAL PRIMARY KEY,
        nama_kategori VARCHAR NOT NULL,
        dibuat_tanggal TIMESTAMP NOT NULL,
        diperbarui_tanggal TIMESTAMP NOT NULL;
    );
    `)
    .then(function(_) {
        console.log(`Kategori table created...`);
        return client.query(`
        CREATE TABLE IF NOT EXISTS "Status" (
            id_status SERIAL PRIMARY KEY,
            nama_status VARCHAR NOT NULL,
            dibuat_tanggal TIMESTAMP NOT NULL,
            diperbarui_tanggal TIMESTAMP NOT NULL
        );
        `);
    })
    .then(function(_) {
        console.log(`Status table created...`)
        return client.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
    })
    .then(function(_) {
        return client.query(`
        CREATE TABLE IF NOT EXISTS "Pengguna" (
            id_pengguna UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username_pengguna VARCHAR(50) NOT NULL UNIQUE,
            password_pengguna VARCHAR(100) NOT NULL,
            role_pengguna VARCHAR NOT NULL CHECK(role_pengguna in ('admin', 'staff')),
            dibuat_tanggal TIMESTAMP NOT NULL,
            diperbarui_tanggal TIMESTAMP NOT NULL;
        );
        `);
    })
    .then(function(_) {
        console.log(`Pengguna table created...`)
        return client.query(`
        CREATE TABLE IF NOT EXISTS "Produk" (
            id_produk SERIAL PRIMARY KEY,
            nama_produk VARCHAR NOT NULL,
            harga INTEGER NOT NULL,
            kategori_id INTEGER NOT NULL REFERENCES "Kategori" ON DELETE CASCADE,
            status_id INTEGER NOT NULL REFERENCES "Status" ON DELETE CASCADE,
            pengguna_id UUID NOT NULL REFERENCES "Pengguna" ON DELETE CASCADE,
            dibuat_tanggal TIMESTAMP NOT NULL,
            diperbarui_tanggal TIMESTAMP NOT NULL;
        );
        `);
    })
    .then(function(_) {
        console.log(`Produk table created...`);
        console.log(`Migration complete...`);
        process.exit(1);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
});