const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const flights = require('./db/flight');

const app = express();
const port = 3001;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
	res.send("API is running.");
});

app.post('/addflight', (req, res) => {
	console.log("post method called.");
	let data = req.body;
	console.log(data);
	flights.insertFlight(data).then(result => {
		if (result) {
			res.send({
				'result': '200 ok'
			});
		}
		else {
			res.send({
				'result': '304'
			});
		}
	});
});

app.get('/getflight', (req, res) => {
	// flights.insertFlight();

	console.log('get request from app. printing filter...');
	console.log(req.query);
	console.log('-----------------')
	let data = [];
	let filter_query = {};
	if ("flightno" in req.query) {
		if (req.query.flightno !== '') {
			
			filter_query = {
				'flightno': req.query.flightno
			};
		}

	}
	else if ("destination" in req.query) {
		
		if (req.query.destination !== '') {
			filter_query = {
				'destination': req.query.destination
			};
		}
	}
	else if ("departure" in req.query) {

		if (req.query.departure !== '') {
			filter_query = {
				'departure': req.query.departure
			};
		}
	}

	flights.filterFlights(filter_query).then(items => {
		data = items;
		res.send(data);
	});
});




app.get('/delete', (req, res) => {
	console.log('delete api request called.');
	console.log(req.query);
	console.log('-----------------');
	let filter_query = {};
	flights.deleteRecord(filter_query).then(output => {
		res.send(output);
	});
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));