var express = require('express');
var router = express.Router();
const config = require('../config')
const Client = require("@replit/database");
const client = new Client();
var datetime = new Date();
client.set("key", "value").then(() => {});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  console.log(`✅ Loaded Page✅\n----------\nRequest Information:\nIp: ${ip}\nDate: ${datetime}\n\n\n`);
});
// define the home page route
router.get('/', (req, res) => {

	if (config.maintanencemode == true) {
		res.render('maintanence', {
			layout: false,

			helpers: {
				alertTitle: config.alertTitle,
				alertinfo: config.alertText,
				alertEnabled: config.alertEnabled,
			}
		});
	} else {
		res.render('games', {
			helpers: {
				alertTitle: config.alertTitle,
				alertinfo: config.alertText,
				alertEnabled: config.alertEnabled,
			}
		});
	}


})
router.get('/:id', (req, res, next) => {
	try {
		res.send(client.getAll())



	} catch (err) {
		console.log(err)
		res.send("Oops there was an error!");			    		  console.log(`❌ Error❌\n----------\nRequest Information:\nIp: ${ip}\nDate: ${datetime}\n\n\n`);


	}
			 
})
router.post('/newGame', (req, res)=>{
	console.log(`File: routes/games.js\n\nDirectory: /game\nRequest Type: POST\nBody Parameters:${req.body}`)
})
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
