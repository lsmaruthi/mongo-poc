var mongoose = require('./db/mongoose-db');
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var newTodo = new Todo({
		text: req.body.text
	})

	newTodo.save().then((doc) => {
		res.send(doc)
	}, (err) => {
		res.status(400).send(err)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	})
})

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id))
		res.status(404).send({});
	Todo.findById({_id: id}).then((todo) => {
		if(!todo)
			res.status(404).send({})
		res.send({todo});
	}).catch((e) => res.status(400).send({data: e}))
})

app.listen(3000, () => {
	console.log('app running')
})

module.exports = {app};