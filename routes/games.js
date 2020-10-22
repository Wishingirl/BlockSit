var express = require('express');
var router = express.Router();
const config = require('../config')
var datetime = new Date();
var path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
router.use('/static', express.static(path.join(__dirname, '../views/public')))

// middleware that is specific to this router

// define the home page route
router.get('/', (req, res) => {
    config.maintanencemode == true ? res.render('maintanence', {
        layout: false,

        helpers: {
            alertTitle: config.alertTitle,
            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    }) : res.render('games', {
        helpers: {
            alertTitle: config.alertTitle,
            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    });
})
router.get('/:id', (req, res, next) => {


})
router.post('/newGame', (req, res) => {
        if (req.body["token"] == config.admintoken) {
            res.send("ok!")
        } else {
            res.send("nope")
        }
    })
    // define the about route
router.get('/about', (req, res) => {
    res.send('About birds');
});

module.exports = router;