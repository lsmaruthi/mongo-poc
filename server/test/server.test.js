var expect = require('expect');
var request = require('supertest');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
	text: 'dont give immigration a shit'
}, {
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