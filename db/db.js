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
// middleware


router.get('/games', (req, res) => {

})