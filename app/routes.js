var User = require('../app/models/user');
var Tweet = require('../app/models/user').tweet;
var userCntl = require('../app/controller/user');


module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('login.ejs', {Title: "Twitter Authentication"});
    });

    app.post('/tweet', function (req, res) {
        userCntl.createTweet(req, function (err) {
            if (err) {
                throw err;
            }
            else {
                res.redirect('/profile');
            }
        })
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        userCntl.getAllTweet(req, res);
    });

    app.post('/saveEmail',function(req,res){
       userCntl.saveEmail(req,function(err){
           if(err){
               throw err;
           }else{
               res.redirect('/profile');
           }
       })
    });

    app.get('/checkUserEmail', isLoggedIn, function (req, res) {
        userCntl.checkUserEmail(req, function(err,email){
            if(err) {
                throw err;
            }
                else {
                if(email)
                    res.redirect("/profile");
                else
                    res.render("email.ejs",{Title:"Email Id"})
            }
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/dashboard', function (req, res) {
        res.render('dashboard.ejs', {Title: "Test"});
    });

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/checkUserEmail',
            failureRedirect: '/'
        }));
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
