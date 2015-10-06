// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	'twitterAuth' : {
		'consumerKey' 		: 'xxxxxxxxxxxxxxxxxxxxxxx',
		'consumerSecret' 	: 'xxxxxxxxxxxxxxxxxxxxxx',
		'callbackURL' 		: 'http://localhost:3000/auth/twitter/callback'
	}
};