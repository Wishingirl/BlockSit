const express = require('express');
const config = require('./config')
const helmet = require('helmet')
const app = express();
var exphbs = require('express-handlebars');
app.use(helmet());
app.set('view engine', 'handlebars');


app.engine('handlebars', exphbs());
app.get('/', (req, res) => {
	if (config.maintanencemode == true) {
		console.log("TEST")
		res.send(config.maintanencetitle)

	}
	res.render('home', {
		helpers: {
			foo: "yes!"
		}
	});
})




app.listen(3000, () => {
	console.log('server started');
});