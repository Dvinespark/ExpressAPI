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
app.get('/', (req, res) => {
	// flights.insertFlight();
	let data;
	flights.getFlights().then(items => {
		data = items;
		if (data.length === 0) {
			res.send({});
		}
		res.send(data);
	});
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));