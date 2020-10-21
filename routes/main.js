var express = require('express');
var router = express.Router();
const config = require('../config')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


router.get('/', function(req, res) {
    config.maintanencemode == true ? res.render('maintanence', {
        layout: false,
        helpers: {
            alertTitle: config.alertTitle,

            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    }) : res.render('home', {
        helpers: {
            alertTitle: config.alertTitle,

            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    });
})


router.get('/changelog', (req, res) => {
    config.maintanencemode == true ? res.render('maintanence', {
        layout: false,

        helpers: {
            alertTitle: config.alertTitle,

            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    }) : res.render('blog', {
        helpers: {
            alertTitle: config.alertTitle,

            alertinfo: config.alertText,
            alertEnabled: config.alertEnabled,
        }
    });
})


module.exports = router;