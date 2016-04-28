(function(){

	var fs = require('fs');
	var path = require('path');
	var bodyParser = require('body-parser');
	var express = require('express');
	var nedb = require('nedb'), database = new nedb({filename : 'review.db', autoload : true});
	var app = express();
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));

	app.get('/getGems', function(req, res){

		fs.readFile('./gems.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.post('/submitReview', function(req, res){
		var count = 0;
		database.insert({
			name : req.body.name,
			stars : req.body.stars,
			reviewBody : req.body.reviewBody,
			author : req.body.author
		}, function(err){});
		count = count + 1;
		if(count == 1)
		{
			console.log("Data added successfully to the database file.");
			res.send("yes");
		}
	});

	app.get('/getReviews', function(req, res){
		var GemReviews = {};
		GemReviews['reviews'] = [];
		database.find({name : req.query.name}, function(err, docs){
			if(err) throw err;
			for(var i = 0; i < docs.length; i++)
			{
				GemReviews['reviews'].push(docs[i]);
			}
			res.send(GemReviews);
		});
	});

	app.listen(process.env.PORT || 8082);
	console.log("Server is listening");
})();