var Tweet = require('../models/Tweet')l

module.exports = function(stream, io){

	//when tweets comes in....
	stream.on('data', function(dat){

		//construct new tweet object 
		var tweet = {

			twid: data['id'],

			active: false,

			author: data['user']['name'],

			avatar: data['user']['profile_image_url'],

			body: data['text'],

			date: data['created_at'],

			screenname: data['user']['screen_name']
		};

		//create a new model instance with our object 
		var tweetEntry = new Tweet(tweet);

		//save tweet to the database
		tweetEntry.save(function(err){

			if(!err){

				//if everything works, socket.io emits tweet
				io.emit('tweet', tweet);
			};
		});

	});

};