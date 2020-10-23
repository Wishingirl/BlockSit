const express = require("express");
var config = require("./config");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
let apidb = require("./db/api");
let mainroutes = require("./routes/main");
let gamespage = require("./routes/games");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// middleware that is specific to this router
const game = new FileSync("./database.json");
const db = low(game);
// setting the view engine
app.set("view engine", "handlebars");

// Configuring the server
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use("/static", express.static(path.join(__dirname, "views/public")));
app.enable("view cache");

app.engine("handlebars", exphbs());


// Routing
app.use("/", mainroutes);
app.use("/games", gamespage);
app.use("/api", apidb);

port = process.env.PORT || 4000;
gamez = db.get("games")
    .map('title')
    .value()


app.listen(port, () => {
    console.log(gamez)
    console.log(`Server Started on Port ${port}`);
});