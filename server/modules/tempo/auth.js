var utils = require('../../app/lib/utility.js');
var tempoUtils = require('./utils.js')
var db = require('../../app/controllers/controller.js');
var model = require('../../app/models/model.js');
var fs = require('fs');

module.exports = {
  /**
 * This function handles GET requests to /modules/tempo/setup,
 *  and renders the setup page.
 *
 * @param req
 * @param res
 */
  setupRender: function(req, res){
    res.render('tempo/tempo-setup');
  },

  /**
 * This function handles GET requests to /modules/tempo/auth,
 *  and renders the setup page.
 *
 * @param req
 * @param res
 */
  authRender: function(req, res){
    res.render('tempo/tempo-auth');
  },
  /**
 * This function handles the submission of a Tempo object from the client, 
 * saving it to the database.
 *
 * @param req
 * @param res
 */
  setup: function(req, res){
    var username = req.session.user;
    var userPairs = req.body;
    var task = {};
    task.pairs = userPairs;
    db.saveAuthTask(username, 'tempo', task, function(error, authTask, user){
      if (error) console.log(error);
      res.send('{"redirect": "/index"}');
    });
  },

  /**
 * This function handles the submission of a Tempo object from the client, 
 * comparing it to the value stored in the database.
 *
 * @param req
 * @param res
 */
  auth: function(req, res){
    var username = req.session.user;
    var submittedUserPairs = req.body;
    db.readAuthTask(username, 'tempo', function(error, authTask, user){
      var referenceUserPairs = authTask.pairs;
      tempoUtils.compareSamples(submittedUserPairs, referenceUserPairs, function(isMatch){
        if (isMatch){
          var token = utils.makeToken(req);
          res.send(JSON.stringify({token:token}));
        } else {
          res.send(JSON.stringify({rejected:true}));
        }
      });
    });
  }
}
