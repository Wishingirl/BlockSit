const express = require('express');
const config = require('./config')
const helmet = require('helmet')
const app = express();
var exphbs = require('express-handlebars');
var path = require('path')
const Database = require("@replit/database")
const db = new Database()



app.use(helmet());
app.set('view engine', 'handlebars');

app.use('/static', express.static(path.join(__dirname, 'views/public')))
app.enable('view cache');

app.engine('handlebars', exphbs());

app.get('/games', (req, res) => {
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




app.listen(3000, () => {
	console.log('server started');
});