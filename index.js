const express = require('express');
var config = require('./config');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan())



// Setting database defaults
//const gameAdapter = new FileSync('./db/games.json');
//const simulcastAdapter = new FileSync('./db/simulcast.json')
//const gameDB = low(gameAdapter);
//const simulcastDB = low(simulcastAdapter);


// setting the view engine
app.set('view engine', 'handlebars');

// Configuring the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'views/public')))
app.enable('view cache');

app.engine('handlebars', exphbs());

let mainroutes = require('./routes/main');



let gamespage = require('./routes/games');
// Routing
app.use('/', mainroutes)

app.use('/games', gamespage)











port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});