"use strict";

const express = require("express");
var router = express.Router();
const config = require("../config");
var path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
router.use("/static", express.static(path.join(__dirname, "../views/public")));
const game = new FileSync("./database.json");
const db = low(game);
const nanoid = require("nanoid");
// middleware

// Database
db.defaults({ games: [], simulcasts: [] }).write();
// www.mipagina/games
router.get("/games", (req, res) => {
    res.send(db.get("games"));
});
router.get("/games/id/:id", (req, res) => {
    res.send(db.get("games").find({ id: req.params.id }).value())

});
router.get("/games/:name", (req, res) => {
    Game = db.get("games").find({ title: req.params.name }).value();
    Game ? res.send(Game) : res.send("Not found.");
});

router.post("/games", (req, res) => {
    if (req.body["token"] == config.admintoken) {
        db.get("games")
            .push({
                id: nanoid.nanoid(10),
                title: req.body["name"],
                url: req.body["url"],
            })
            .write();
        res.send("Game added.");
    } else {
        res.send("incorrect token");
    }
});
router.put("/games", (req, res, next) => {
    // Update game is complex lulw
    if (req.body["token"] != config.admintoken) { // does he have a token?
        res.send("Incorrect Admin Token"); // nope
    }
    if (req.body["token"] === config.admintoken) { // yes, does he have the correct token?
        req.body["name"] ? next() : res.send("cant do"); // Next() -> Yes you have || No? Cant do.
        if (req.body["newurl"] && !req.body["newname"]) { // Your telling me you want to update the url but not the name.

            db.get("games") // Get games db
                .find({
                    title: req.body["name"], // Find the tile by the name request
                })
                .assign({
                    url: req.body["newurl"], // Set the new url
                })
                .write(); //Apply
            res.send("Game url updated."); // Output with information.
        } else if (req.body["newname"] && !req.body["newurl"]) { // You want to update the name?
            db.get("games")
                .find({
                    title: req.body["name"], //Find by name
                })
                .assign({
                    title: req.body["newname"], //Update the name
                })
                .write(); //apply
            res.send("Game name updated."); // Output the info
        } else if (req.body["newname"] && req.body["newurl"]) {
            db.get("games")
                .find({
                    title: req.body["name"],
                })
                .assign({
                    title: req.body["newname"],
                    url: req.body["newurl"],
                })
                .write();
            res.send("Game url and name updated.");
        } else if (!req.body["newname"] && !req.body["newurl"]) {
            res.send("Empty parameters.")
        }
    }
});
router.get("/simulcasts", (req, res) => {
    res.send("simulcast api goes here ecks de");
});

router.get("/", (req, res) => {
    res.send("<h1>API</h1><br>idk");
});

module.exports = router;