var expect = require('expect');
var request = require('supertest');
const {ObjectID} = require('mongodb');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'dont give immigration a shit'
}, {
	_id: new ObjectID(),
	text: 'get urself ready for new challenges'
}]

beforeEach((done) => {
	Todo.remove({})
	.then(() => {
		return Todo.insertMany(todos);
	})
	.then(() => done());
})

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'dont give immigration a shit';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) 
				return done(err)

			Todo.find({text}).then((docs) => {
				expect(docs.length).toBe(2);
				expect(docs[0].text).toBe(text);
				done();
			}).catch((e) => done(e))
		})
	})

	it('should not create a new todo', (done) => {
		var text = 'dont give immigration a shit';
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err) 
				return done(err)

			Todo.find().then((docs) => {
				expect(docs.length).toBe(2);
				done();
			}).catch((e) => done(e))
		})
	})
})


describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2)
		})
		.end(done)
	})
})

describe('GET /todos:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	})

	it('should return 404 if objectid is invalid', (done) => {
		var hexId = new ObjectID().toHexString() + new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	})
})

describe('DELETE /todos:id', () => {
	it('should remove a todo', (done) => {
		request(app)
		.delete(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end((err, res) => {
			if(err) 
				return done(err)
		});
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	})

	it('should return 404 if objectid is invalid', (done) => {
		var hexId = new ObjectID().toHexString() + new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	})
})