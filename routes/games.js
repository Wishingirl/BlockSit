var express = require("express");
var router = express.Router();
const config = require("../config");
var datetime = new Date();
var path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
router.use("/static", express.static(path.join(__dirname, "../views/public")));

// middleware that is specific to this router
const game = new FileSync("./database.json");
const db = low(game);
// define the home page route
games = db.get("games");

router.get("/", (req, res) => {
    db.read()
    config.maintanencemode == true ?
        res.render("maintanence", {
            layout: false,

            helpers: {
                alertTitle: config.alertTitle,
                alertinfo: config.alertText,
                alertEnabled: config.alertEnabled,
            },
        }) :
        res.render("games", {
            helpers: {
                gametitles: db.get("games").map('title').value(),
                alertTitle: config.alertTitle,
                alertinfo: config.alertText,
                alertEnabled: config.alertEnabled,
            },
        });
});
router.get("/:id", (req, res, next) => {

});

// define the about route
router.get("/about", (req, res) => {
    res.send("About birds");
});

module.exports = router;