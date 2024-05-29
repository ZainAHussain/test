const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

// These lines will be explained in detail later in the unit
app.use(express.json());// process json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// These lines will be explained in detail later in the unit

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mahima123:mahima@giftdelivery.almmzvv.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Global for general use
var customerCollection;

client.connect(err => {
	customerCollection = client.db("health_tracker").collection("customers");


	// perform actions on the collection object
	console.log('Database up!\n')

});


app.get('/', (req, res) => {
	res.send('Hello World!')
})

// LOGIN
app.post('/verifyUser', (req, res) => {

	loginData = req.body;

	console.log(loginData);

	customerCollection.find({ email: loginData.email, password: loginData.password }, { projection: { _id: 0 } }).toArray(function (err, docs) {
		if (err) {
			console.log("Some error.. " + err + "\n");
		} else {
			console.log(JSON.stringify(docs[0]) + " have been retrieved.\n");
			res.status(200).send(docs);
		}

	});

});

// SIGN UP 
app.post('/postSignupData', function (req, res) {

	console.log("POST request received : " + JSON.stringify(req.body));

	customerCollection.insertOne(req.body, function (err, result) {
		console.log(req.body);
		if (err) {
			console.log("Some error.. " + err + "\n");
		} else {
			console.log(JSON.stringify(req.body) + " have been signup\n");
			res.send(JSON.stringify(req.body));
		}

	});

});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});
