const newpost = require("./routes/newpost.routers");
const artigos = require("./routes/postagens.routers");
const index = require("./routes/index.routers");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use("/static", express.static(__dirname + "/public"));
app.use("/", index);
app.use("/", artigos);
app.use("/", newpost);

app.listen(process.env.port || 3000, function () {
  console.log("Servidor esta em execução na porta: 3000");
});
