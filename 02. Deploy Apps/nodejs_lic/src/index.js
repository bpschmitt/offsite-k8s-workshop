// index.js

/**
 * Required External Modules
 */

const os = require('os');
const nr = require('newrelic');
const path = require('path');
const express = require('express');
const winston = require('winston');
const newrelicFormatter = require('@newrelic/winston-enricher');

/**
 * App Variables
 */

 const app = express();
 const port = 4000;
 const appTitle = process.env.APP_TITLE
 var counter = 0;


 const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({myTestLabel: 'test123'}),
        newrelicFormatter()
    )
};
const logger = winston.createLogger(logConfiguration);

/**
 *  App Configuration
 */

 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");
 app.use(express.static(path.join(__dirname, "public")));


/**
 * Routes Definitions
 */


 function between(min, max) {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

// Set up home route
app.get('/', (req, res) => {
    var random_num = between(10,100).toString();
    var message = "Thanks for visiting " + appTitle +".  Your random number is " + random_num;
    res.render("index", { title: appTitle, test: random_num, hostname: os.hostname() });
    logger.info(message);
  });


// Set up second page
  app.get('/second', (req, res) => {
      message = "You've visited the second page.  Your random number is " + between(10,100).toString()
      res.send(message);
      logger.info(message);
  });

/**
 * Server Activation
 */

 app.listen(port, () => {
    logger.info(`Success! Your app is running on on port ${port}.`);
  });
