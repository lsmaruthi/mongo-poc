const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log('unable to connect to mongodb server');
	}

	console.log('connected to mongodb server');
	const db = client.db('todoapp');

	// find and update one todo record
	db.collection('Todos').findOneAndUpdate({
		name: 'eat lunch'
	}, {
		$set: {completed: true}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result)			
	}, (err) => {
		return console.log('findOneAndUpdate operation failed');
	}).finally(() => {
		client.close();
	})

	// find and update one user record
	db.collection('Users').findOneAndUpdate({
		name: 'aparna'
	}, {
		$set: {name: 'aparna v'},
		$inc: {age: 1}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result)			
	}, (err) => {
		return console.log('findOneAndUpdate operation failed');
	}).finally(() => {
		client.close();
	})	
})