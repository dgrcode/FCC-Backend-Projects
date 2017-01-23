//"use strict";
const express = require("express");

const app = express();

const months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

app.get('/:input', (req, res) => {
	const input = req.params.input;
	const inputNum = parseInt(input);
	
	let inputDate;
	let d;
	let m;
	let y;
	let resultObject = {unix: null, natural: null};
	if (isNaN(inputNum)) {
		// must be a natural date
		inputDate = new Date(input);
		let unix = inputDate.getTime()/1000;
		if (!isNaN(unix)) {
			resultObject.natural = input;
			resultObject.unix = unix;
		}
	} else {
		// the number is a valid unix timestamp
		resultObject.unix = +input;
		inputDate = new Date(inputNum*1000);
		m = months[inputDate.getUTCMonth()];
		d = inputDate.getUTCDate();
		y = inputDate.getUTCFullYear();
		resultObject.natural = m + ' ' + d + ', ' + y;
	}

	res.write(JSON.stringify(resultObject));
	res.end();
});

app.get('/', (req,res) =>  res.sendFile(__dirname + '/index.html'));

app.listen(process.env.PORT);
console.log('App listening on port ' + process.env.PORT);

module.exports = app; // for testing