var mongoose = require('mongoose');

//Create new schema for tweet data 
var schema = new mongoose.Schema({
	twid:       String, 
	active:     Boolean, 
	author:     String, 
	avatar:     String, 
	body:       String, 
	date:       Date, 
	screenname: String
});


//Create static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback){

	var tweets = [],
		start = (page * 10) + (skip * 1);

	//Query db, using skip and limit to achieve page chunks
	Tweet.find({}, 'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,doc){

		//if everything works 
		if(!err){
			tweets = docs;	//got tweets
			tweets.forEach(function(tweets){
				tweet.active = true; 	//set tweet to active 
			});
		}

		//Pass tweet back to specified callback 
		callback(tweets);

	});	
};


//Return tweet model based upon defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);