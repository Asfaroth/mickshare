const express = require('express');
const morgan = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.LOG_FORMAT ?? 'combined'));
app.use(sassMiddleware({
  src: 'public',
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
