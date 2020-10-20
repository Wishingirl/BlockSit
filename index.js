const express = require('express');
const config = require('./config');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors')
const Database = require("@replit/database")




const games = new Database()

// Setting database defaults

	

// setting the view engine
app.set('view engine', 'handlebars');

// Configuring the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'views/public')))
app.enable('view cache');
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.engine('handlebars', exphbs());




let gamespage = require('./routes/games')
// Routing
app.use('/games', gamespage)






app.get('/youtube', (req, res) => {
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
		res.render('youtube', {
			helpers: {
				alertTitle: config.alertTitle,
				alertinfo: config.alertText,
				alertEnabled: config.alertEnabled,
			}
		});
	}


})

app.get('/blog', (req, res) => {
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
		res.render('blog', {
			helpers: {
				alertTitle: config.alertTitle,

				alertinfo: config.alertText,
				alertEnabled: config.alertEnabled,
			}
		});
	}


})

app.get('/', (req, res) => {
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
		res.render('home', {
			helpers: {
				alertTitle: config.alertTitle,

				alertinfo: config.alertText,
				alertEnabled: config.alertEnabled,
			}
		});
	}
})




app.listen(process.env.PORT, () => {
	console.log('server started');
});