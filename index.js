const express = require('express');
const config = require('./config')
const helmet = require('helmet')
const app = express();
var exphbs = require('express-handlebars');
var path = require('path')
app.use(helmet());
app.set('view engine', 'handlebars');

app.use('/static', express.static(path.join(__dirname, 'views/public')))


app.engine('handlebars', exphbs());
app.get('/games', (req, res) => {
	if (config.maintanencemode == true) {
		console.log("TEST")
		res.send(config.maintanencetitle)

	}
	res.render('games', {
		helpers: {
			alertinfo: config.alertText,
			alertEnabled: config.alertEnabled,
		}
	});


})
app.get('/', (req, res) => {
	if (config.maintanencemode == true) {
		console.log("TEST")
		res.send(config.maintanencetitle)

	}
	res.render('home', {
		helpers: {
			alertinfo: config.alertText,
			alertEnabled: config.alertEnabled,
		}
	});
})




app.listen(3000, () => {
	console.log('server started');
});