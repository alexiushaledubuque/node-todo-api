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
	text: 'Second test todo',
	completed: true,
	completedAt: 777
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

describe('GET /todos/:id', () => {
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

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString()

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId)
			})
			.end((err, res) => {
				if (err) {
					return done(err)
				}

				// query database using findById toNotExits
				// expect(null).toNotExist()
				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist()
					done()
				}).catch((e) => done(e))
			})
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString()

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done)
	})

	it('should return 404 if object id is invalid', (done) => {
		request(app)
			.delete('/todos/123abc')
			.expect(404)
			.end(done)	
	})
})

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		// grab id of 1st item
		var hexId = todos[0]._id.toHexString()

		// update text
		var text = 'Testing PATCH - updating the text'

		// set completed is true
		// 200
		// text is changed, completed is true, completedAt is a number .toBeA
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(true)
				expect(res.body.todo.completedAt).toBeA('number')
			})
			.end(done)
	})

	it('should clear completedAt when todo is not completed', (done) => {
		// grab id of 2nd todo item
		var hexId = todos[1]._id.toHexString()

		// update text
			var text = 'PATCH testing!!!'
		// set completed to false
		// 200
		// text is changed, completed is false, completedAt is null, .toNotExist

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: false,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(false)
				expect(res.body.todo.completedAt).toNotExist()
			})
			.end(done)
	})
})
