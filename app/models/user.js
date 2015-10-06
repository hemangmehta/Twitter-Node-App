// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var tweetSchema = mongoose.Schema({
    tweet : String,
    twitterId :mongoose.Schema.ObjectId,
    response : String,
    data : String,
    createdAt : Date
})

// define the schema for our user model
var userSchema = mongoose.Schema({
    twitter          : {
        id           : String,
        token        : String,
        secretToken  : String,
        displayName  : String,
        username     : String,
        email        : String
    }
});

// checking if password is valid using bcrypt
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// this method hashes the password and sets the users password
userSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
module.exports.tweet = mongoose.model('Tweet', tweetSchema);

