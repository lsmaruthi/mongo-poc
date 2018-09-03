const {mongoose} = require('./../server/db/mongoose-db');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b8af01c22cad21358e8d929';
if(!ObjectID.isValid(id))
	console.log('object id not valid')

Todo.find({
	_id: id
}).then((todos) => {
	console.log(todos)
})

Todo.findOne({
	_id: id
}).then((todo) => {
	if(!todo)
		return console.log('todo not found')
	console.log(todo)
})

Todo.findById({
	_id: id
}).then((todo) => {
	if(!todo)
		return console.log('todo not found')
	console.log(todo)
}).catch((e) => {
	console.log(e)
})

User.findById({
	_id: id
}).then((user) => {
	if(!user)
		return console.log('user not found')
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
	console.log(e)
})