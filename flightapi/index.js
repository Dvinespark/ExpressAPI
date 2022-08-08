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

	console.log('get request from app.');
	let data = [];
	let filter_query = {};
	if ("flightno" in req.params) {
		filter_query = {
			'flighno': req.params.source
		};

	}
	else if ("destination" in req.params) {
		
		filter_query = {
			'destination': req.params.destination
		};
	}
	else if ("departure" in req.params) {

		filter_data = {
			'departure': req.params.flight_date
		};
	}

	flights.filterFlights(filter_query).then(items => {
		data = items;
		res.send(data);
	});
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));