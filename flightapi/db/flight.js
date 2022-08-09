const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/LambtonAF";

const flightSchema = new mongoose.Schema({
	flightno: Number,
	duration: Number,
	source: String,
	destination: String,
	departure: Date

});

mongoose.connect(url).catch(error => {
	console.log(error);
});

mongoose.connection.on('error', err => {
	console.log('Error occurred.');
})

const Flights = mongoose.model('flights', flightSchema);

// get all students
let  getFlights = () => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Flights.find({});
			return data;
		});
}

let insertFlight = (item) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = {
				'flightno': 10001,
				'duration': 3,
				'source': "ktm",
				'destination': "pkr",
				'departure': new Date('December 17, 1995 03:24:00')
			};
			return new Flights(item).save();
		});
}

// filter flight

let filterFlights = (filter_query) => {
	console.log('Filter Query --');
	console.log(filter_query);

	// logic for date part
	if ('departure' in filter_query) {

		let start_date = new Date(filter_query.departure);
		let end_date = new Date(start_date);
		end_date.setDate(start_date.getDate() + 1);
		filter_query =
			{
				"departure" : {"$gte": start_date,
					"$lt": end_date
				}
			  }
	}

	return mongoose.connect(url)
		.then(db => {
			// filter data based on key value
			const data = Flights.find(filter_query);
			return data;
		});
}





// delete student from database
let deleteRecord = (flight_query) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Flights.findOneAndRemove(flight_query, (err) => {
				console.log(err);
				return false;
			});
			return true;
		});
}


// setting id for new insertion
// let  getNewId = () => {
// 	return mongoose.connect(url)
// 		.then((db) => {
// 			const data = Student.findOne().sort({ id: -1 }).limit(1);
// 			return data;
// 		});
// }

// get student by id
// let  getStudentById = (id) => {
// 	return mongoose.connect(url)
// 		.then((db) => {
// 			const data = Student.findOne({id: id});
// 			return data;
// 		});
// }

module.exports = {
	getFlights,
	filterFlights,
	insertFlight,
	deleteRecord
}