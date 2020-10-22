var express = require('express');
var router = express.Router();
const config = require('../config')
var datetime = new Date();
var path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
router.use('/static', express.static(path.join(__dirname, '../views/public')))
const game = new FileSync('games.json');
const gamedb = low(game);
const nanoid = require('nanoid')
    // middleware


// Database
gamedb.defaults({ games: [] })
    .write()


router.get('/games', (req, res) => {
    db.get('games')

})
router.get('/games/:id', (req, res) => {
    Game = db.get('posts').find({ id: this.req.params.id }).value()
    db.has(Game).value() ? res.send(Game) : res.send("Not found.");
})
router.get('/games/:name', (req, res) => {
    Game = db.get('posts').find({ title: this.req.params.name }).value()
    Game ? res.send(Game) : res.send("Not found.");
})


router.post('/newgame', (req, res) => {
    req.body["token"] == config.admintoken ? db.get('games').push({ id: nanoid(10), title: this.req.body["name"], url: this.req.body["url"] }).write().then(() => { res.send("Game added."); }) : res.send("incorrect token");
})
router.put('/updategame', (req, res) => {
    if (req.body["token"] == config.admintoken) {
        db.get('games')
            .find({ title: this.req.body["name"] })
            .assign({ title: this.req.body["newname"] })
            .write()
    }
})
router.get('/simulcasts', (req, res) => {
    res.send("simulcast api goes here ecks de")
})

router.get('/', (req, res) => {
    res.send("<h1>API</h1><br>idk")

})

module.exports = router;