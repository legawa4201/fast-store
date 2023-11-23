if(process.env.NODE_ENV !== `production`) require(`dotenv`).config();

const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);

const routes_v1 = require(`./routes/v1/index`);
const { connect } = require("./config/connection");

app.set(`view engine`, `ejs`);

app.use(cors());
app.use(cookieParser(`IniRahasiaJanganBilangSiapapun`));
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.use(routes_v1);

connect(function(err, message) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(message);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});