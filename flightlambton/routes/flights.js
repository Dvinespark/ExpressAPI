var express = require('express');
var router = express.Router();

// /lambtonflights/ get request
router.get('/', function (req, res, next) {
	let data = {};
  	res.render('index.ejs', { title: 'Flights', data });
});


// /lambtonflights/  post request
router.post('/', function (req, res, next) {
	
	console.log('method called');
	console.log(req.body);
	let data = {};
  	res.render('index.ejs', { title: 'Flights', data });

});

	

// lambtonflights/list
router.get('/list', function (req, res, next) {
	let data = {};
  	res.render('flights.ejs', { title: 'List', data });

});


module.exports = router;
