const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo'
}]

// Testing lifecycle method - empty the database
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() => done())
})

describe('POST /todos', () => {
	it('should create a new todo', (done) => { // specify (done) for async functions
		var text = 'Test todo text'

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text)
			})
			.end((err, res) => { // .end wraps things up
				if (err) {
					return done(err)
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1)
					expect(todos[0].text).toBe(text)
					done()
				}).catch((e) => done(e))
			})
	})

	it('should not create todo with invalid body data', (done) => {
		// CHALLENGE - MAKE A REQUEST WITH SEND AS AN EMPTY OBJECT
		// EXPECT 400 STATUS CODE
		// ASSUMPTION - LENGTH OF TODOS IS 0
		
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err)
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2)
					done()
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

xdescribe('GET /todos/:id', () => {
	it('should return todo doc', (done) => { // async test so done is specified
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`) // must pass strings in get request
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text) // custom expect
			})
			.end(done)
	})

	// CHALLENGE
	it('should return 404 if todo not found', (done) => {
		// make a request with a real Object id - valid id
		// make sure you get a 404 back
		var hexId = new ObjectID().toHexString()

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done)
	})

	it('should return 404 for non-object ids', (done) => {
		// /todos/123 (unable to convert to an object id with toHexString() 
		request(app)
			.get('/todos/123abc')
			.expect(404)
			.end(done)
	}) 
})