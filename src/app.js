'use strict';

/**
* Import libraries
*/
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'); //Parse JSON in body request

// Use native promises
mongoose.Promise = global.Promise;

/**
* Load files
*/
const config = require('./config/server.config'),
    db = require('./config/db.config');

/**
* Create express app
*/
const app = express();

/**
* Database connection handler
*/
mongoose.connect(db.mongoURI[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + db.mongoURI[app.settings.env]);
    }
});

/**
* Apply libraries over our app
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
* Require route file wit app
*/
require('./endpoints/routes.js')(app);

/**
*  Start server
*/
app.listen(config.port, () => console.log('Example app listening on port ' + config.port + '!'));

setTimeout(() => {
    console.log('mongoose connection state: ' + mongoose.connection.readyState);
}, 5000);

module.exports =app;
