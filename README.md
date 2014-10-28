# EasyAuth [![Build Status](https://travis-ci.org/mountain-device/easyauth.svg?branch=master)](https://travis-ci.org/mountain-device/easyauth)

EasyAuth is a new Authentication platform that provides a wide range of authentication services for web applications.

## Team

  - __Product Owner__: Allen Krulwich
  - __Scrum Master__: Ryo Osawa
  - __Development Team Members__: Carl Goldberg, Supriya Bhat

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Setting up EasyAuth]
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- MongoDB
- OpenCV

## Development

Follow the steps below to set up EasyAuth in your local environment

```sh
# git clone <your forked easyauth repo>
# cd into easyauth repo
# npm install
# grunt build
```
### Creating a module ###

For EasyAuth to use your module, you will need to put your files in particular directories within the app. 

* Each module is responsible for registering four request handlers in the route table:

/server/server-config.js:
````
var someModule = require('./modules/moduleName/auth.js');
...
app.get('/modules/moduleName/setup', util.checkUser, someModule.setupRender);
app.get('/modules/moduleName/auth', util.checkUser, someModule.authRender);
app.post('/modules/moduleName/setup', util.checkUser, someModule.setup);
app.post('/modules/moduleName/auth', util.checkUser, someModule.auth);
````
* Then, you must create a module directory and an auth.js file:

/server/modules/moduleName/auth.js:
````
// Module directories should have an auth.js file that exports an object with the following four request handlers:
module.exports = {
  //This is the request handler for GET '/modules/moduleName/setup'
  setupRender: function(req, res){
    res.render('moduleName/password-setup');
  },
  //This is the request handler for GET '/modules/moduleName/auth'
  authRender: function(req, res){
    res.render('password/password-auth');
  },
  //This is the request handler for POST '/modules/moduleName/setup'
  setup: function(req, res){
    var username = req.session.user;
    var userProvidedPassword = req.body.password;
    // Store the user's reference data in the database
    db.saveAuthTask(username, moduleName, task_data_object, function(error, task_data_object, username){
      res.redirect('/index');
    });
  },
  //This is the request handler for POST '/modules/moduleName/auth'
  auth: function(req, res){
    var username = req.session.user;
    var userSubmittedData = req.body;
    // Recall the user's reference data from the database
    db.readAuthTask(username, moduleName, function(error, storedUserData, user){
      //compare userSubmittedData and storedUserData and decide whether to authenticate the user. 
    });
  },
};

````
* Then, you may optionally create templates for your GET request handlers:
These can either be html forms that submit post requests, or an html file that has a script that makes a post request. 
  
  * (The post request should be made to the path "", ie, the same url that user is currently viewing)

/server/views/moduleName/moduleName-auth.ejs

/server/views/moduleName/moduleName-setup.ejs

## Roadmap

View the project roadmap [here](https://waffle.io/mountain-device/easyauth)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
