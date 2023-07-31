import express, { urlencoded } from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

app.set("view engine", "pug");

app.use((req, res, next) => {
  const year = new Date();

  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de viajes";

  next();
});

//agrega body parse para leer los datos del formulario
app.use(urlencoded({ extended: true }));

app.use(express.static("public"));

//agregar router
app.use("/", router);

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
