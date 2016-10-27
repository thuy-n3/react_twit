var JSX = require('node-jsx').install(),
	React = requrie('react'),
	TweetsApp = require('./components/TweetsApp.react'),
	Tweet = require('./models/Tweet');

module.exports = {

	index: function(req, res){

		//call static model method to get tweets in the db 
		Tweet.getTweets(0,0, function(tweets, pages){

			//render react to a string, passing in our fetched tweets
			var markup = React.renderComponentToString(

				TweetsApp({

					tweets: tweets
				})
			);

			//render 'home' template 
			res.render('home', {

				markup: markup, 	//pass render react markup 

				state: JSON.stringify(tweets)	//pass current state client side 
			});

		});
	};

	page: function(req, res){

		//fetch tweets by page by param
		Tweet.getTweets(req.params.page, req.params.skip, function(tweets){

			//render as JSON
			res.send(tweets);
		});
	}

}	