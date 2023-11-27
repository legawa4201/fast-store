const { connect } = require(`../config/connection`);
const bcrypt = require(`bcryptjs`)

// ------------------------------------- Helpers Function ------------------------------------------ //

function hashPass(plainPass) {
    return bcrypt.hashSync(plainPass, 10);
}

function getCurrentDate() {
    let now = new Date()
    let getFormat = now.toLocaleTimeString(`id-ID`, { year: `numeric`, month: `numeric`, day: `numeric` }).split(`,`)
    return getFormat[0].split(`/`).join(`-`) + getFormat[1].split(`.`).join(`:`)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// ------------------------------------- Helpers Function ------------------------------------------ //


// ------------------------------------- Seeding Sources ------------------------------------------ //

const users = require(`../data/pengguna.json`).map(function(user) {
    const hashedPass = hashPass(user.password)
    return `('${user.username}', '${hashedPass}', '${user.role}', '${getCurrentDate()}', '${getCurrentDate()}')`;
}).join(`,`);

const categories = require(`../data/kategori.json`).map(function(category) {
    return `('${category.name}', '${getCurrentDate()}', '${getCurrentDate()}')`;
}).join(`,`);

const status = require(`../data/status.json`).map(function(stat) {
    return `('${stat.nama}', '${getCurrentDate()}', '${getCurrentDate()}')`;
}).join(`,`);

const products = require(`../data/data_raw.json`).data.map(function(product) {
    delete product.no;
    delete product.id_produk;
    return product;
})

// ------------------------------------- Seeding Sources ------------------------------------------ //


// ------------------------------------- Insert Query ------------------------------------------ //

connect(function(err, client) {
    if(err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Successfully connected to database...`);

    let kategori_db;  //
    let status_db;   // Before we insert products data into its table, we have to know first the id of kategori, status, and pengguna. So here we're declaring variable for each one of them as undefined first. Each time we insert into their table, we're gonna re-assign the undefined variable with data from irrespective table.
    let pengguna_db;//
    client.query(`
    INSERT INTO "Pengguna"("username_pengguna", "password_pengguna", "role_pengguna", "dibuat_tanggal", "diperbarui_tanggal") 
    VALUES ${users};
    `)
    .then(function(_) {
        console.log(`Data inserted into Pengguna table...`);
        return client.query(`
        INSERT INTO "Kategori"("nama_kategori", "dibuat_tanggal", "diperbarui_tanggal")
        VALUES ${categories};
        `)
    })
    .then(function(_) {
        console.log(`Data inserted into Kategori table...`);
        return client.query(`
        INSERT INTO "Status"("nama_status", "dibuat_tanggal", "diperbarui_tanggal")
        VALUES ${status};
        `)
    })
    .then(function(_) {
        console.log(`Data inserted into Status table...`);
        return client.query(`
        SELECT "id_kategori", "nama_kategori" FROM "Kategori";
        `)
        .then(function(result) {
            kategori_db = result.rows
            return client.query(`
            SELECT "id_status", "nama_status" FROM "Status";
            `)
        })
        .then(function(result) {
            status_db = result.rows
            return client.query(`
            SELECT "id_pengguna" FROM "Pengguna";
            `)
        })
        .then(function(result) {
            pengguna_db = result.rows.map(function(user) {
                return user.id_pengguna;
            });
            let values = products.map(function(product) {
                let kategori_id;
                let status_id;
                let pengguna_db_idx = getRandomInt(0, pengguna_db.length - 1);
                kategori_db.forEach(function(category) {
                    if(category.nama_kategori === product.kategori) kategori_id = category.id_kategori;
                })
                status_db.forEach(function(stat) {
                    if(stat.nama_status === product.status) status_id = stat.id_status;
                })
                return `('${product.nama_produk}', '${product.harga}', '${kategori_id}', '${status_id}', '${pengguna_db[pengguna_db_idx]}', '${getCurrentDate()}', '${getCurrentDate()}')`
            });

            return client.query(`
            INSERT INTO "Produk"("nama_produk", "harga", "kategori_id", "status_id", "pengguna_id", "dibuat_tanggal", "diperbarui_tanggal")
            VALUES ${values};
            `)
        })
        .then(function(_) {
            console.log(`Data inserted into Produk table...`);
            console.log(`Seeding complete...`);
            process.exit(1);
        })
        .catch(function(err) {
            console.error(err);
            process.exit(1);
        });
    })
})

// ------------------------------------- Insert Query ------------------------------------------ //