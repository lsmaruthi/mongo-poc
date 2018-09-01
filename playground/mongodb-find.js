const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to mongodb server');
	const db = client.db('todoapp');

	db.collection('Todos').find({completed: false}).toArray().then((todos) => {
		console.log('todos');
		console.log(JSON.stringify(todos, undefined, 2))
	}, () => {
		console.log('unable to fetch todos');
	})

	db.collection('Todos').find().count().then((count) => {
		console.log(`todos: ${count}`);
	}, () => {
		console.log('unable to fetch todos');
	})

	db.collection('Users').find({name: 'maruthi'}).toArray().then((users) => {
		console.log('users');
		console.log(JSON.stringify(users, undefined, 2))
	}, () => {
		console.log('unable to fetch users');
	})

	db.collection('Users').find().count().then((count) => {
		console.log(`users: ${count}`);
	}, () => {
		console.log('unable to fetch users');
	})

	client.close();

});