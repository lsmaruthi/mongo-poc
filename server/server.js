var mongoose = require('./db/mongoose-db');
const _ = require('lodash');
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
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
		return res.status(404).send({});
	Todo.findById({_id: id}).then((todo) => {
		if(!todo)
			return res.status(404).send({})
		res.send({todo});
	}, (err) => {
		res.status(400).send(err);
	})
})

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send({});
	Todo.findByIdAndRemove({_id: id}).then((todo) => {
		if(!todo)
			return res.status(404).send({})
		res.send({todo});
	}, (err) => {
		res.status(400).send(err);
	})
})

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id))
		return res.status(404).send({});
	if(_.isBoolean(body.completed) && body.completed)
		body.completedAt = new Date().getTime();
	else 
		body.completed = false;
		body.completedAt = null;

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo)
			return res.status(404).send({});
		res.send({todo})
	})
})

app.listen(port, () => {
	console.log('started at', port)
})

module.exports = {app};