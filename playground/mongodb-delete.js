const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log('unable to connect to mongodb server');
	}

	console.log('connected to mongodb server');
	const db = client.db('todoapp');

	// delete many
	db.collection('Todos').deleteMany({name: 'eat lunch'}).then((result) => {
		console.log(result);
	}, (err) => {
		return console.log('deletemany execution failed');
	}).finally(() => {
		client.close();
	})

	// delete one
	db.collection('Todos').deleteOne({name: 'eat lunch'}).then((result) => {
		console.log(result);
	}, (err) => {
		return console.log('deletemany execution failed');
	}).finally(() => {
		client.close();
	})

	// find one and delete one
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	}, (err) => {
		return console.log('deletemany execution failed');
	}).finally(() => {
		client.close();
	})

	// delete duplicate records
	db.collection('Users').find({name: 'jen'}).toArray().then((result) => {
		result.forEach((doc) => {
			db.collection('Users').deleteMany({_id: new ObjectID(doc._id.toString())}).then((result) => {
				console.log(result)
			}, (err) => {
				return console.log('delete many operation failed', err);
			})	
		});				
	}, (err) => {
		return console.log('find many operation failed');
	}).finally(() => {
		client.close();
	})	
})