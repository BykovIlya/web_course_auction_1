var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var fs = require('fs');
var http = require('http');
var https = require('https');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};
var port = 2000;
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('images', path.join(__dirname, 'images'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
var server = https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});
/*
app.listen(2000, function () {
    console.log('listening on port 2000!');
});*/
module.exports = app;