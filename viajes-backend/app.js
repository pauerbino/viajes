var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

const cors = require('cors');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/viajes', {useMongoClient: true})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var lists = require('./routes/lists');
var users = require('./routes/users');
var register = require('./routes/register');
var app = express();
app.use(cors());

app.use(passport.initialize());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/lists', lists);
app.use('/api/v1/users', users);
app.use('/api/v1/register', register);

require('./config/passport');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
