var express = require('express');
var router = express.Router();
const request = require("request");

// /lambtonflights/ get request
router.get('/', function (req, res, next) {
	let data = {};
  	res.render('index.ejs', { title: 'Flights', data });
});


// /lambtonflights/  post request
router.post('/', function (req, res, next) {
	
	console.log('post app method called');
	console.log(req.body);
	let data = {};

	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: "http://127.0.0.1:3001/addflight",
			body: JSON.stringify(req.body)
		}
		, function (err, response, body) {
		if (!err && response.statusCode == 200) {
  			res.redirect("/lambtonflights/list");
		}
		else {
  			res.render('index.ejs', { title: 'Flights', message: "Error occured." });
		}
	}); 


});

	

// lambtonflights/list
router.get('/list', function (req, res, next) {

	let data = [];
	console.log('ui-----------');
	console.log(req.query);
	console.log('ui-----------');
	let base_url = 'http://127.0.0.1:3001/getflight';
	request({url: base_url, qs:req.query}, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			console.log('data received');
			data = JSON.parse(body);
  			res.render('flights.ejs', { title: 'List', data });
		}
		else {
 		 	res.render('flights.ejs', { title: 'List', data });
		}
	});

});



// lambtonflights/delete
router.get('/delete', function (req, res, next) {

	let data = [];
	let base_url = 'http://127.0.0.1:3001/delete';
	request({url: base_url, qs:req.query}, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			data = JSON.parse(body);
			res.redirect('/lambtonflights/list');
		}
		else {
			res.redirect('/lambtonflights/list');
		}
	});

});


module.exports = router;
