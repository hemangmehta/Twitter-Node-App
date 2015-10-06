/**
 * Created by Hemang on 9/28/2015.
 */
var Twit 		= require('twit')
var auth 		= require('../../config/auth.js').twitterAuth;
var Tweet       = require('../../app/models/user').tweet;
var moment 		= require('moment');
var User        = require('../../app/models/user');

module.exports = {

    createTweet : function(req,callback){

        var T = new Twit({
            consumer_key:  auth.consumerKey
            , consumer_secret:auth.consumerSecret
            , access_token: req.user.twitter.token
            , access_token_secret : req.user.twitter.secretToken
        });

        T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
            console.log(req.user);
            var tweetModel = new Tweet();
            tweetModel.tweet = req.body.tweet;
            tweetModel.twitterId = req.user._id;
            tweetModel.createdAt = new Date();
            tweetModel.data = JSON.stringify(data);
            tweetModel.response = JSON.stringify(response);
            tweetModel.save(function(err,save){
                if(err)callback(err)
                else {
                    callback(null);
                    console.log("save");
                }
            })

        })
    },

    getAllTweet : function(req,res){
        var tweetModel = new Tweet();
        Tweet.find({twitterId : req.user._id},'tweet createdAt').sort({ createdAt : 'desc'}).exec(function(err,data){
            res.render('dashboard.ejs',{
                Title:"Twitter Authentication",
                user : req.user,
                data : data,
                moment : moment
            })
        });
    },

    checkUserEmail : function(req,callback){
        var user = new User();
        User.findOne({_id:req.user._id},function(err,data){
            console.log(data);
            if(err) callback(err,null);
            else {
                if(data.twitter.email){
                    console.log("email exist");
                    callback(null,data.twitter.email);
                }
                else{
                    console.log("email not exist");
                    callback(null,null);
                }
            }
        });
    },

    saveEmail : function(req,callback){
        var user = new User();
        User.findOne({_id:req.user._id},function(err,data){
            if(err) callback(err);
            else {
                if(data){
                    data.twitter.email = req.body.email;
                    data.save(function(err,data){
                        if(err){
                            callback(err);
                        }else{
                            callback(null);
                        }
                    });
                }
            }
        });
    }
}

