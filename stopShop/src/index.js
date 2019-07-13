const port = '6969';
const database = require('./config/database.config')
const config = require('./config/config');
const express = require('express');

let app = express();
let enviroment = process.env.NODE_ENV || 'development';

database(config[enviroment]);
require('./config/express')(app, config[enviroment]);
require('./config/routes')(app);

app.listen(port);