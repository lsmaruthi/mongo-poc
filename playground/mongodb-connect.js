const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to mongodb server');
	const db = client.db('todoapp');

	db.collection('Todos').insertOne({
		name: 'walking the dog',
		completed: true
	}, (err, result) => {
		if(err) 
			return console.log('unable to insert todo', err);
		console.log(JSON.stringify(result.ops, undefined, 2));
	})

	db.collection('Users').insertOne({
		name: 'aparna',
		age: 30,
		location: 'vizag'
	}, (err, result) => {
		if(err) 
			return console.log('unable to insert user', err);
		console.log(JSON.stringify(result.ops, undefined, 2));
	})
	client.close();

});