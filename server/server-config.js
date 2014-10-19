var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

/*app.get('/', util.checkUser, handler.renderIndex);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);*/

app.get('/*', function(req, res) {
  res.end('Welcome to EasyAuth!');
});

/*
app.post('/:moduleName/login', function(req, res){
  var module = require('./' + moduleName + '/auth.js');
  //var stuffFromDB = getFromDatabase(req.body.user, moduleName);
  module.login(req.body, stuffFromDB);
});

*/
module.exports = app;
