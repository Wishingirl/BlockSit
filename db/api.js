'use strict'

const express = require('express');
var router = express.Router();
const config = require('../config')
var path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
router.use('/static', express.static(path.join(__dirname, '../views/public')))
const game = new FileSync('./games.json');
const gamedb = low(game);
const nanoid = require('nanoid')
    // middleware

// Database
gamedb.defaults({ games: [] })
    .write()


router.get('/games', (req, res) => {
    res.send(gamedb.get('games'));

})
router.get('/games/:id', (req, res) => {
    Game = gamedb.get('posts').find({ id: this.req.params.id }).value()
    db.has(Game).value() ? res.send(Game) : res.send("Not found.");
})
router.get('/games/:name', (req, res) => {
    Game = gamedb.get('posts').find({ title: this.req.params.name }).value()
    Game ? res.send(Game) : res.send("Not found.");
})


router.post('/newgame', (req, res) => {
    if (req.body["token"] == config.admintoken) {
        gamedb.get('games').push({ id: nanoid.nanoid(10), title: req.body["name"], url: req.body["url"] }).write()
        res.send("Game added.");

    } else { res.send("incorrect token"); }
})
router.put('/updategame', (req, res) => {
    req.body["token"] == config.admintoken ? gamedb.get('games').find({ title: this.req.body["name"] }).assign({ title: this.req.body["newname"] }).write() : res.send("Incorrect token lmao");
})
router.get('/simulcasts', (req, res) => {
    res.send("simulcast api goes here ecks de")
})

router.get('/', (req, res) => {
    res.send("<h1>API</h1><br>idk");

})

module.exports = router;