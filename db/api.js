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

router.get("/games", (req, res) => {
    res.send(db.get("games"));
});
router.get("/games/:id", (req, res) => {
    Game = db.get("posts").find({ id: this.req.params.id }).value();
    db.has(Game).value() ? res.send(Game) : res.send("Not found.");
});
router.get("/games/:name", (req, res) => {
    Game = db.get("posts").find({ title: this.req.params.name }).value();
    Game ? res.send(Game) : res.send("Not found.");
});

router.post("/newgame", (req, res) => {
    if (req.body["token"] == config.admintoken) {
        db
            .get("games")
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
router.put("/updategame", (req, res, next) => {
    // Update game is complex lulw
    if (req.body["token"] != config.admintoken) {
        res.send("Incorrect Admin Token")
    }
    if (req.body["token"] === config.admintoken) {
        req.body["name"] ? next() : res.send("cant do");
        if (req.body["newurl"] && !req.body["newname"]) {
            db
                .get("games")
                .find({
                    title: req.body["name"],
                })
                .assign({
                    url: req.body["newurl"],
                })
                .write();
            res.send("Game url updated.");
        } else if (req.body["newname"] && !req.body["newurl"]) {
            db
                .get("games")
                .find({
                    title: req.body["name"],
                })
                .assign({
                    title: req.body["newname"],
                })
                .write();
            res.send("Game name updated.");
        } else if (req.body["newname"] && req.body["newurl"]) {
            db
                .get("games")
                .find({
                    title: req.body["name"],
                })
                .assign({
                    title: req.body["newname"],
                    url: req.body["newurl"],
                })
                .write();
            res.send("Game url and name updated.");
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