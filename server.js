if(process.env.NODE_ENV !== `production`) require(`dotenv`).config();

const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);

const routes_v1 = require(`./routes/v1/index`);

app.set(`view engine`, `ejs`);

app.use(cors());
app.use(cookieParser(`IniRahasiaJanganBilangSiapapun`));
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.use(routes_v1);



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));