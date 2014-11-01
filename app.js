var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// dynamically load all routes
fs.readdirSync('./routes')
  .forEach(function (file) {
    var filename = file.substring(0, file.lastIndexOf('.'));

    app.use('/' + (filename === 'index' ? '' : filename.replace(/\./g, '/')), require('./routes/' + filename));
  });

// dynamically load all data routes
fs.readdirSync('./public/data')
  .forEach(function (file) {

    // File must be of type json
    if (file.substring(file.lastIndexOf('.')) === '.json') {
      var filename = file.substring(0, file.lastIndexOf('.')),
        filenamePath = '/' + filename.replace(/\./g, '/');

      var dataRoute = express.Router().get('/', function (req, res) {
        var jsonFile = fs.readFileSync('./public/data/' + file);
        res.send(JSON.parse(jsonFile));
      });

      app.use(filenamePath, dataRoute);
    }
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
