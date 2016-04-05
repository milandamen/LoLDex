var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Config
var config = require('./modules/config');

// Authentication
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
//var auth = require('./modules/auth');

// Connection
var mongoose = require('mongoose');
mongoose.connect(config.db_host + ':' + config.db_port + '/' + config.db_name);

// Models and repos
require('./model/user'); //Registreet alleen het schema bij mongoose


var app = express();


// TODO auth
// Normaliter doet passport dit voor ons
// Nu doet mijn eigen middelware dit voor ons oplossen, ik ben dus altijd ingelogd!
//app.use(function(req, res, next){
    //var User = require('mongoose').model('User');
    //req.user = new User({ username: "Stino", roles: ["admin"]});
    //next();
//})



// view engine setup
app.engine('hbs', exphbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
require('./config/passport')(passport);
app.use(session({ secret: 'milandamenmarkjandejong13' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./routes/users')(app, passport);
app.use('/', require('./routes/champions'));


// Dit is mijn middelware voor error handeling vanuit de routes
//app.use(function(err, req, res, next) {
  //if(!err){ next(); }
  //res.status = 403;
  //var msg = {
      //msg: "Oops somethign went wrong :(",
      //err: err,
  //}
  //res.json(msg);
//});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
