var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: [PasswordAuthSchema],
    face: [ FaceAuthSchema ],
    tempo: [TempoAuthSchema]
});
var User = mongoose.model('User', UserSchema);

/*
  Note: This is an ugly solution to extend UserSchema to run our unit tests
        We will remove this schema once we figure out a way to extend UserSchema dynamically
 */
var FaceAuthSchema = new mongoose.Schema({
  picture: String
});

var PasswordAuthSchema = new mongoose.Schema({
  password: String
});

var TempoAuthSchema = new mongoose.Schema({
  pairs: mongoose.Schema.Types.Mixed
});

var TempoObject = mongoose.model('tempoObjects', TempoAuthSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(isMatch);
    }
  });
};

/*userSchema.pre('save', function(next){
  bcrypt.hash(this.password, null, null, function(err, hash) {
    this.password = hash;
    next();
  });
});*/


module.exports = User;
