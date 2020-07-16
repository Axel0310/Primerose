require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const hbs = require("hbs");
const flash = require("connect-flash");
const dev_mode = false; //To enable developpement middlewares
require("./config/mongodb");
require("./helpers/hbs");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 600000 },
  resave: false,
  saveUninitialized: true,
  resave: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(flash());

if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}

app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));

//Routers
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/shops', require('./routes/shops'));
app.use('/user', require('./routes/users'));
app.use('/', require('./routes/auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
