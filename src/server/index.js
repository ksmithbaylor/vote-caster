// Dependencies
var express = require('express');
var chalk = require('chalk');
var path = require('path');
var http = require('http');

// Create the app
var app = express();

// Enable color output
chalk.enabled = true;

// Log all requests as they come in
app.use((req, res, next) => {
  console.log(chalk.blue(req.method + ' ' + req.url));
  next();
});

// Serve files out of 'public' folder
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Start app on port 3000
app.listen(3000, () => {
  console.log(chalk.blue('Server started on localhost:3000'));

  // Force the page to reload, if LiveReload is running
  var liveReloadRequest = http.request({
    host: 'localhost',
    port: '35729',
    path: '/changed?files=index.html'
  });
  liveReloadRequest.on('error', err => console.log(chalk.blue('No LiveReload server running')));
  liveReloadRequest.end();
});
