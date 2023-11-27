const fs = require(`fs`)

// fs.readFile(`./data/data_raw.json`, `utf-8`, (err, data_raw) => {
//     if(err) return console.log(err)
//     const { data } = JSON.parse(data_raw);
//     let kategori = {}
//     data.forEach((product) => {
//         if(kategori[product.kategori] === undefined) kategori[product.kategori] = product.kategori
//     })
//     fs.writeFile(`./data/a.json`, JSON.stringify(kategori), {}, (err) => {
//         if(err) return console.log(err)
//         return console.log(`Success`);
//     })
// })

// const kategori = Object.keys(JSON.parse(fs.readFileSync(`./data/a.json`, `utf-8`)))

// let json = kategori.map((k) => {
//     return { name: k }
// })

// fs.writeFileSync(`./data/a.json`, JSON.stringify(json))